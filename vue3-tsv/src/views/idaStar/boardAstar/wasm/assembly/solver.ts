/**
 * 开窗双向 A* WASM 核心（AssemblyScript）
 * 优化：字节盘面 arena + 整数状态 id、SOA 少分配、曼哈顿/相邻增量更新
 */

@external("env", "js_on_progress")
declare function js_on_progress(ptr: usize, len: i32): void;

@external("env", "js_now_ms")
declare function js_now_ms(): f64;

const DIR_U: i32 = 0;
const DIR_R: i32 = 1;
const DIR_D: i32 = 2;
const DIR_L: i32 = 3;

const MAX_N: i32 = 100;
const MAX_FOCUS: i32 = 100;
const MAX_WINDOWS: i32 = 128;
const MAX_PATH: i32 = 200000;
const MAX_PROGRESS: i32 = 256;
const MAX_ERROR: i32 = 256;
/** 单阶段最大状态数（盘面字节 = MAX_STATES * MAX_N；按 ≤10×10 开窗峰值预留） */
const MAX_STATES: i32 = 3000000;

let width: i32 = 0;
let height: i32 = 0;
let n: i32 = 0;
let emptyNum: i32 = 0;
let winW: i32 = 3;
let winH: i32 = 1;
let winWeight: f64 = 4.0;

const finish = new StaticArray<u8>(MAX_N);
const finishPos = new StaticArray<i32>(MAX_N);
const startList = new StaticArray<u8>(MAX_N);
const curList = new StaticArray<u8>(MAX_N);
const inputBuf = new StaticArray<u8>(MAX_N);
const scratch = new StaticArray<u8>(MAX_N);
const posScratch = new StaticArray<i32>(MAX_N);
const focusMask = new StaticArray<u8>(MAX_N);

/** 目标态下每格相邻数字（最多 4），precompute */
const adjCount = new StaticArray<i32>(MAX_N);
const adjTiles = new StaticArray<i32>(MAX_N * 4);

const focusArr = new StaticArray<i32>(MAX_FOCUS);
let focusLen: i32 = 0;

const winLefts = new StaticArray<i32>(MAX_WINDOWS);
const winTops = new StaticArray<i32>(MAX_WINDOWS);
const winWs = new StaticArray<i32>(MAX_WINDOWS);
const winHs = new StaticArray<i32>(MAX_WINDOWS);
let winCount: i32 = 0;

const outActions = new StaticArray<u8>(MAX_PATH);
let outActionLen: i32 = 0;
/** 回溯临时栈（正序写出前倒序） */
const pathStack = new StaticArray<i32>(MAX_PATH);
let pathStackLen: i32 = 0;

const progressBuf = new StaticArray<u8>(MAX_PROGRESS);
let progressLen: i32 = 0;
const errorBuf = new StaticArray<u8>(MAX_ERROR);
let errorLen: i32 = 0;

let stateCntTotal: i32 = 0;
let expandCnt: i32 = 0;

// ---- 状态池 SOA（按 id）----
const boardStore = new Uint8Array(MAX_STATES * MAX_N);
const gArr = new StaticArray<i32>(MAX_STATES);
const emptyArr = new StaticArray<i32>(MAX_STATES);
const actionArr = new StaticArray<i32>(MAX_STATES);
const parentArr = new StaticArray<i32>(MAX_STATES);
const costArr = new StaticArray<f64>(MAX_STATES);
const hManhArr = new StaticArray<f64>(MAX_STATES);
const hAdjArr = new StaticArray<f64>(MAX_STATES);
const nextHashArr = new StaticArray<i32>(MAX_STATES);
/** 0=无, 1=open, 2=closed */
const statusArr = new StaticArray<u8>(MAX_STATES);
let stateCount: i32 = 0;

/** hash -> 链表头 state id */
const visitMap = new Map<u64, i32>();

const heapData = new StaticArray<i32>(MAX_STATES);
let heapLen: i32 = 0;

@inline
function abs(x: i32): i32 {
  return x < 0 ? -x : x;
}
@inline
function manh(a: i32, b: i32): i32 {
  const w = width;
  return abs(a / w - b / w) + abs(a % w - b % w);
}
@inline
function min(a: i32, b: i32): i32 {
  return a < b ? a : b;
}
@inline
function max(a: i32, b: i32): i32 {
  return a > b ? a : b;
}

function setProgress(s: string): void {
  progressLen = 0;
  for (let i = 0; i < s.length && i < MAX_PROGRESS; i++) {
    progressBuf[i] = u8(s.charCodeAt(i) & 0xff);
    progressLen++;
  }
  js_on_progress(changetype<usize>(progressBuf), progressLen);
}

function clearError(): void {
  errorLen = 0;
}

function setError(s: string): void {
  errorLen = 0;
  for (let i = 0; i < s.length && i < MAX_ERROR; i++) {
    errorBuf[i] = u8(s.charCodeAt(i) & 0xff);
    errorLen++;
  }
}

/**
 * 进度按扩展次数触发。千次耗时≈5.552ms 时，原 500ms≈9万次；加倍≈18万次。
 * 仅真正输出时调用 js_now_ms。
 */
const TICK_EVERY: i32 = 180000;

function emitTickWin(
  left: i32,
  top: i32,
  ww: i32,
  wh: i32,
  cnt: i32,
  startMs: f64,
  lastEmitCnt: i32
): i32 {
  if (cnt <= 0 || cnt - lastEmitCnt < TICK_EVERY) return lastEmitCnt;
  const dur = <i32>(js_now_ms() - startMs);
  setProgress(
    "tickwin:" +
      left.toString() +
      "," +
      top.toString() +
      "," +
      ww.toString() +
      "x" +
      wh.toString() +
      ":" +
      cnt.toString() +
      ":" +
      dur.toString()
  );
  return cnt;
}

function emitTickBi(cnt: i32, startMs: f64, lastEmitCnt: i32): i32 {
  if (cnt <= 0 || cnt - lastEmitCnt < TICK_EVERY) return lastEmitCnt;
  const dur = <i32>(js_now_ms() - startMs);
  setProgress("tickbi:" + cnt.toString() + ":" + dur.toString());
  return cnt;
}

function copyBoard(dst: StaticArray<u8>, src: StaticArray<u8>): void {
  for (let i = 0; i < n; i++) dst[i] = src[i];
}

function findEmpty(list: StaticArray<u8>): i32 {
  for (let i = 0; i < n; i++) {
    if (<i32>list[i] == emptyNum) return i;
  }
  return n - 1;
}

@inline
function focusHas(tile: i32): bool {
  return focusMask[tile] != 0;
}

function rebuildFocusMask(): void {
  for (let i = 0; i < MAX_N; i++) focusMask[i] = 0;
  for (let k = 0; k < focusLen; k++) {
    focusMask[focusArr[k]] = 1;
  }
}

function buildAdjTable(): void {
  for (let t = 0; t < MAX_N; t++) adjCount[t] = 0;
  for (let i = 0; i < n; i++) {
    const num = <i32>finish[i];
    if (num == emptyNum) continue;
    let c = 0;
    if (i % width != width - 1) {
      const num2 = <i32>finish[i + 1];
      if (num2 != emptyNum) {
        adjTiles[num * 4 + c] = num2;
        c++;
      }
    }
    if (i / width != height - 1) {
      const num2 = <i32>finish[i + width];
      if (num2 != emptyNum) {
        adjTiles[num * 4 + c] = num2;
        c++;
      }
    }
    // 也加入左/上，使「单 tile 贡献」覆盖该 tile 参与的所有目标相邻对的一半？
    // JS getAdjacent(nn) 只累加 finishNum2Idx[num].adjNum（含四向），且整盘求和时横/纵各算一次。
    // 单 tile 增量用 adjNum 四向列表：
  }
  // 重建为四向完整邻接（与 JS finishNum2Idx.adjNum 一致）
  for (let i = 0; i < n; i++) {
    const num = <i32>finish[i];
    if (num == emptyNum) continue;
    let c = 0;
    if (i >= width) {
      adjTiles[num * 4 + c] = <i32>finish[i - width];
      c++;
    }
    if (i + width < n) {
      adjTiles[num * 4 + c] = <i32>finish[i + width];
      c++;
    }
    if (i % width != 0) {
      adjTiles[num * 4 + c] = <i32>finish[i - 1];
      c++;
    }
    if (i % width != width - 1) {
      adjTiles[num * 4 + c] = <i32>finish[i + 1];
      c++;
    }
    // 过滤空格邻接
    let c2 = 0;
    for (let k = 0; k < c; k++) {
      const t = adjTiles[num * 4 + k];
      if (t != emptyNum) {
        adjTiles[num * 4 + c2] = t;
        c2++;
      }
    }
    adjCount[num] = c2;
  }
}

function fillPos(list: StaticArray<u8>): void {
  for (let i = 0; i < n; i++) posScratch[<i32>list[i]] = i;
}

/** 单数字在相邻启发中的贡献（对齐 JS getAdjacent(list, nn)） */
function adjContribOne(tile: i32): f64 {
  if (tile == emptyNum) return 0;
  let total: f64 = 0;
  const idx = posScratch[tile];
  const c = adjCount[tile];
  for (let k = 0; k < c; k++) {
    const num1 = adjTiles[tile * 4 + k];
    total += <f64>(manh(idx, posScratch[num1]) - 1);
  }
  return total;
}

function getAdjacentFull(list: StaticArray<u8>): f64 {
  fillPos(list);
  // 与原先整盘算法一致：按目标格横/纵边各加一次（不是四向 double）
  let total: f64 = 0;
  for (let i = 0; i < n; i++) {
    const num = <i32>finish[i];
    if (num == emptyNum) continue;
    if (i % width != width - 1) {
      const num2 = <i32>finish[i + 1];
      if (num2 != emptyNum) {
        total += <f64>(manh(posScratch[num], posScratch[num2]) - 1);
      }
    }
    if (i / width != height - 1) {
      const num2 = <i32>finish[i + width];
      if (num2 != emptyNum) {
        total += <f64>(manh(posScratch[num], posScratch[num2]) - 1);
      }
    }
  }
  return total;
}

function manhattanTo(
  list: StaticArray<u8>,
  goalPos: StaticArray<i32>,
  weighted: bool
): f64 {
  let sum: f64 = 0;
  for (let i = 0; i < n; i++) {
    const tile = <i32>list[i];
    if (tile == emptyNum) continue;
    const m = <f64>manh(i, goalPos[tile]);
    sum += weighted && focusHas(tile) ? m * winWeight : m;
  }
  return sum;
}

/** list 为移动后；emptyBefore 为移动前空位 */
function updateManhattan(
  oldH: f64,
  listAfter: StaticArray<u8>,
  emptyBefore: i32,
  dir: i32,
  goalPos: StaticArray<i32>,
  weighted: bool
): f64 {
  const emptyAfter = moveEmpty(emptyBefore, dir);
  const tile = <i32>listAfter[emptyBefore];
  const dNew = manh(emptyBefore, goalPos[tile]);
  const dOld = manh(emptyAfter, goalPos[tile]);
  const w = weighted && focusHas(tile) ? winWeight : 1.0;
  return oldH + <f64>(dNew - dOld) * w;
}

/** 对齐 JS updateAdjacent：只更新被移动数字的相邻贡献 */
function updateAdjacent(
  oldAdj: f64,
  listAfter: StaticArray<u8>,
  emptyBefore: i32,
  dir: i32
): f64 {
  const emptyAfter = moveEmpty(emptyBefore, dir);
  const tile = <i32>listAfter[emptyBefore];
  if (tile == emptyNum) return oldAdj;

  fillPos(listAfter);
  const d1 = adjContribOne(tile);

  // 移动前：tile 在 emptyAfter，空格在 emptyBefore
  posScratch[tile] = emptyAfter;
  posScratch[emptyNum] = emptyBefore;
  const d2 = adjContribOne(tile);

  return oldAdj + d1 - d2;
}

function isFocusDone(list: StaticArray<u8>): bool {
  for (let k = 0; k < focusLen; k++) {
    const tile = focusArr[k];
    if (tile == emptyNum) continue;
    if (<i32>list[finishPos[tile]] != tile) return false;
  }
  return true;
}

function canMove(empty: i32, dir: i32): bool {
  if (dir == DIR_U) return empty >= width;
  if (dir == DIR_R) return empty % width != width - 1;
  if (dir == DIR_D) return empty + width < n;
  if (dir == DIR_L) return empty % width != 0;
  return false;
}

function moveEmpty(empty: i32, dir: i32): i32 {
  if (dir == DIR_U) return empty - width;
  if (dir == DIR_R) return empty + 1;
  if (dir == DIR_D) return empty + width;
  return empty - 1;
}

function applyDir(list: StaticArray<u8>, empty: i32, dir: i32): i32 {
  const other = moveEmpty(empty, dir);
  const t = list[empty];
  list[empty] = list[other];
  list[other] = t;
  return other;
}

function reverseDir(d: i32): i32 {
  if (d == DIR_U) return DIR_D;
  if (d == DIR_D) return DIR_U;
  if (d == DIR_L) return DIR_R;
  return DIR_L;
}

function hashBoard(list: StaticArray<u8>): u64 {
  let h: u64 = 14695981039346656037;
  for (let i = 0; i < n; i++) {
    h ^= <u64>list[i];
    h *= 1099511628211;
  }
  return h;
}

function storeBoard(id: i32, list: StaticArray<u8>): void {
  const base = id * n;
  for (let i = 0; i < n; i++) boardStore[base + i] = list[i];
}

function loadBoard(id: i32, out: StaticArray<u8>): void {
  const base = id * n;
  for (let i = 0; i < n; i++) out[i] = boardStore[base + i];
}

function boardsEqual(id: i32, list: StaticArray<u8>): bool {
  const base = id * n;
  for (let i = 0; i < n; i++) {
    if (boardStore[base + i] != list[i]) return false;
  }
  return true;
}

/** 撤销一步：emptyAfter 为移动后空位，dir 为刚才的动作 */
@inline
function undoDir(list: StaticArray<u8>, emptyAfter: i32, dir: i32): void {
  applyDir(list, emptyAfter, reverseDir(dir));
}

function resetSearchPool(): void {
  visitMap.clear();
  stateCount = 0;
  heapLen = 0;
}

function findVisited(h: u64, list: StaticArray<u8>): i32 {
  if (!visitMap.has(h)) return -1;
  let id = visitMap.get(h);
  while (id >= 0) {
    if (boardsEqual(id, list)) return id;
    id = nextHashArr[id];
  }
  return -1;
}

function linkVisited(h: u64, id: i32): void {
  if (visitMap.has(h)) {
    nextHashArr[id] = visitMap.get(h);
  } else {
    nextHashArr[id] = -1;
  }
  visitMap.set(h, id);
}

function allocState(
  list: StaticArray<u8>,
  g: i32,
  empty: i32,
  action: i32,
  parent: i32,
  cost: f64,
  hManh: f64,
  hAdj: f64,
  st: u8
): i32 {
  if (stateCount >= MAX_STATES) {
    setError("状态数超过 MAX_STATES=" + MAX_STATES.toString());
    return -1;
  }
  const id = stateCount++;
  storeBoard(id, list);
  gArr[id] = g;
  emptyArr[id] = empty;
  actionArr[id] = action;
  parentArr[id] = parent;
  costArr[id] = cost;
  hManhArr[id] = hManh;
  hAdjArr[id] = hAdj;
  statusArr[id] = st;
  return id;
}

// ---- 整数堆 ----
@inline
function heapLess(a: i32, b: i32): bool {
  const ca = costArr[a];
  const cb = costArr[b];
  if (ca != cb) return ca < cb;
  return gArr[a] > gArr[b];
}

function heapPush(id: i32): void {
  let i = heapLen++;
  heapData[i] = id;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!heapLess(heapData[i], heapData[p])) break;
    const tmp = heapData[i];
    heapData[i] = heapData[p];
    heapData[p] = tmp;
    i = p;
  }
}

function heapPop(): i32 {
  if (heapLen == 0) return -1;
  const top = heapData[0];
  heapLen--;
  if (heapLen > 0) {
    heapData[0] = heapData[heapLen];
    let i = 0;
    while (true) {
      let smallest = i;
      const l = i * 2 + 1;
      const r = l + 1;
      if (l < heapLen && heapLess(heapData[l], heapData[smallest])) smallest = l;
      if (r < heapLen && heapLess(heapData[r], heapData[smallest])) smallest = r;
      if (smallest == i) break;
      const tmp = heapData[i];
      heapData[i] = heapData[smallest];
      heapData[smallest] = tmp;
      i = smallest;
    }
  }
  return top;
}

function pushOutAction(a: i32): void {
  if (outActionLen < MAX_PATH) outActions[outActionLen++] = u8(a);
}

function appendPathById(meetId: i32, revDir: bool): void {
  pathStackLen = 0;
  let id = meetId;
  while (id >= 0 && parentArr[id] >= 0) {
    if (pathStackLen >= MAX_PATH) break;
    pathStack[pathStackLen++] = actionArr[id];
    id = parentArr[id];
  }
  for (let i = pathStackLen - 1; i >= 0; i--) {
    let a = pathStack[i];
    if (revDir) a = reverseDir(a);
    pushOutAction(a);
  }
}

function applyActionsToCur(from: i32, len: i32): void {
  let empty = findEmpty(curList);
  for (let i = 0; i < len; i++) {
    empty = applyDir(curList, empty, <i32>outActions[from + i]);
  }
}

function buildWindows(): void {
  winCount = 0;
  const ww = min(winW, width);
  const wh = min(winH, height);
  for (let t0 = 0; t0 < height; t0 += wh) {
    for (let l0 = 0; l0 < width; l0 += ww) {
      const left = l0 + ww > width ? max(0, width - ww) : l0;
      const top = t0 + wh > height ? max(0, height - wh) : t0;
      let dup = false;
      for (let i = 0; i < winCount; i++) {
        if (
          winLefts[i] == left &&
          winTops[i] == top &&
          winWs[i] == ww &&
          winHs[i] == wh
        ) {
          dup = true;
          break;
        }
      }
      if (dup || winCount >= MAX_WINDOWS) continue;
      winLefts[winCount] = left;
      winTops[winCount] = top;
      winWs[winCount] = ww;
      winHs[winCount] = wh;
      winCount++;
    }
  }
}

function collectWindowNums(left: i32, top: i32, w: i32, h: i32): void {
  for (let r = top; r < top + h; r++) {
    for (let c = left; c < left + w; c++) {
      const tile = <i32>finish[r * width + c];
      if (tile == emptyNum || focusHas(tile) || focusLen >= MAX_FOCUS) continue;
      focusArr[focusLen++] = tile;
      focusMask[tile] = 1;
    }
  }
}

function setAllFocus(): void {
  focusLen = 0;
  for (let i = 0; i < MAX_N; i++) focusMask[i] = 0;
  for (let i = 0; i < n; i++) {
    const tile = <i32>finish[i];
    if (tile == emptyNum) continue;
    focusArr[focusLen++] = tile;
    focusMask[tile] = 1;
  }
}

function solveWindow(left: i32, top: i32, ww: i32, wh: i32): i32 {
  const pathStart = outActionLen;
  if (isFocusDone(curList)) return 0;

  resetSearchPool();
  const startEmpty = findEmpty(curList);
  const h0 = manhattanTo(curList, finishPos, true);
  const a0 = getAdjacentFull(curList);
  const c0 = <f64>0 + h0 + a0 / 2.0;
  const sid = allocState(curList, 0, startEmpty, DIR_D, -1, c0, h0, a0, 1);
  if (sid < 0) return -1;
  linkVisited(hashBoard(curList), sid);
  heapPush(sid);

  let localExpand: i32 = 0;
  const startMs = js_now_ms();
  let lastEmitCnt: i32 = 0;
  let closedCnt: i32 = 0;

  while (heapLen > 0) {
    const id = heapPop();
    if (id < 0 || statusArr[id] != 1) continue;
    if (costArr[id] != costArr[id]) continue; // NaN guard
    statusArr[id] = 2;
    closedCnt++;

    loadBoard(id, scratch);
    if (isFocusDone(scratch)) {
      appendPathById(id, false);
      stateCntTotal += stateCount;
      expandCnt += localExpand;
      return outActionLen - pathStart;
    }

    const empty = emptyArr[id];
    const g = gArr[id];
    const hManh = hManhArr[id];
    const hAdj = hAdjArr[id];

    for (let dir: i32 = 0; dir < 4; dir++) {
      if (g > 0 && dir == reverseDir(actionArr[id])) continue;
      if (!canMove(empty, dir)) continue;
      const nempty = applyDir(scratch, empty, dir);
      const h = hashBoard(scratch);
      const existed = findVisited(h, scratch);
      if (existed >= 0) {
        undoDir(scratch, nempty, dir);
        continue;
      }

      const nh = updateManhattan(hManh, scratch, empty, dir, finishPos, true);
      const na = updateAdjacent(hAdj, scratch, empty, dir);
      const ng = g + 1;
      const ncost = <f64>ng + nh + na / 2.0;
      const nid = allocState(scratch, ng, nempty, dir, id, ncost, nh, na, 1);
      if (nid < 0) return -1;
      linkVisited(h, nid);
      heapPush(nid);
      localExpand++;
      undoDir(scratch, nempty, dir);
    }
    lastEmitCnt = emitTickWin(left, top, ww, wh, localExpand, startMs, lastEmitCnt);
  }

  stateCntTotal += stateCount;
  expandCnt += localExpand;
  setError(
    "开窗还原失败(" +
      left.toString() +
      "," +
      top.toString() +
      "," +
      ww.toString() +
      "x" +
      wh.toString() +
      ")"
  );
  return -1;
}

function solveBi(): i32 {
  const pathStart = outActionLen;
  let same = true;
  for (let i = 0; i < n; i++) {
    if (curList[i] != finish[i]) {
      same = false;
      break;
    }
  }
  if (same) return 0;

  const backGoalPos = new StaticArray<i32>(MAX_N);
  for (let i = 0; i < n; i++) backGoalPos[<i32>curList[i]] = i;

  // 正向池
  resetSearchPool();
  const fEmpty = findEmpty(curList);
  const fH = manhattanTo(curList, finishPos, false);
  const fA = getAdjacentFull(curList);
  const fStart = allocState(curList, 0, fEmpty, DIR_D, -1, fH + fA / 2.0, fH, fA, 1);
  if (fStart < 0) return -1;
  linkVisited(hashBoard(curList), fStart);
  heapPush(fStart);
  const fHeapStartLen = 0; // use same heap; we'll run alternating with two pools

  // 简化：双向各用独立池 — 用第二套局部数组太贵；改为顺序：先复制 finish 到 scratch 开反向
  // 这里用两套 visit/heap 会重复代码。采用：状态池分段 — 正向 state 0..，反向另起 Map。
  // 为少改动：反向单独再开一套轻量搜索用同一 SOA，但 id 空间共享会冲突。
  // 做法：正向搜完不释放；反向用 status 高位区分？更简单：两次独立 reset 不共享相遇。
  // 正确双向需要同时存在两边状态。用两个 Map + 两段 id：
  //   正向用当前池；反向状态存在同一 SOA，visitMapF / visitMapB 两个 map。

  return solveBiDual(backGoalPos, pathStart);
}

function solveBiDual(backGoalPos: StaticArray<i32>, pathStart: i32): i32 {
  // 重新初始化双向前向
  resetSearchPool();
  const visitF = new Map<u64, i32>();
  const visitB = new Map<u64, i32>();
  // 复用全局 visitMap 不便，改用参数 map 的局部函数

  const fEmpty = findEmpty(curList);
  const fH0 = manhattanTo(curList, finishPos, false);
  // 收尾双向 JS 只用曼哈顿（无 adjacent）；保持一致
  const fStart = allocState(curList, 0, fEmpty, DIR_D, -1, fH0, fH0, 0, 1);
  if (fStart < 0) return -1;
  {
    const h = hashBoard(curList);
    nextHashArr[fStart] = -1;
    visitF.set(h, fStart);
  }

  const heapF = new StaticArray<i32>(MAX_STATES);
  let heapFLen: i32 = 0;
  const heapB = new StaticArray<i32>(MAX_STATES);
  let heapBLen: i32 = 0;

  // local heap ops
  // 为控制文件长度，内联简化 push/pop 闭包用函数

  heapF[0] = fStart;
  heapFLen = 1;

  copyBoard(scratch, finish);
  const bEmpty = findEmpty(scratch);
  const bH0 = manhattanTo(scratch, backGoalPos, false);
  const bStart = allocState(scratch, 0, bEmpty, DIR_D, -1, bH0, bH0, 0, 1);
  if (bStart < 0) return -1;
  {
    const h = hashBoard(scratch);
    nextHashArr[bStart] = -1;
    visitB.set(h, bStart);
  }
  heapB[0] = bStart;
  heapBLen = 1;

  const fStartId = fStart;
  const bStartId = bStart;

  let meetIdF: i32 = -1;
  let meetIdB: i32 = -1;
  let biCnt: i32 = 0;
  const biStartMs = js_now_ms();
  let biLastEmitCnt: i32 = 0;

  while ((heapFLen > 0 || heapBLen > 0) && meetIdF < 0) {
    // ---- forward ----
    if (heapFLen > 0) {
      // pop min from heapF
      let bestI = 0;
      for (let i = 1; i < heapFLen; i++) {
        if (heapLess(heapF[i], heapF[bestI])) bestI = i;
      }
      const id = heapF[bestI];
      heapF[bestI] = heapF[--heapFLen];
      if (statusArr[id] != 1) {
        // skip
      } else {
        statusArr[id] = 2;
        biCnt++;
        loadBoard(id, scratch);
        // meet?
        const hh = hashBoard(scratch);
        let bid = visitB.has(hh) ? visitB.get(hh) : -1;
        while (bid >= 0) {
          if (boardsEqual(bid, scratch)) {
            meetIdF = id;
            meetIdB = bid;
            break;
          }
          bid = nextHashArr[bid];
        }
        if (meetIdF < 0 && id != bStartId) {
          const empty = emptyArr[id];
          const g = gArr[id];
          const hManh = hManhArr[id];
          for (let dir: i32 = 0; dir < 4; dir++) {
            if (g > 0 && dir == reverseDir(actionArr[id])) continue;
            if (!canMove(empty, dir)) continue;
            const nempty = applyDir(scratch, empty, dir);
            const h = hashBoard(scratch);
            let existed = visitF.has(h) ? visitF.get(h) : -1;
            let found = false;
            while (existed >= 0) {
              if (boardsEqual(existed, scratch)) {
                found = true;
                break;
              }
              existed = nextHashArr[existed];
            }
            if (found) {
              undoDir(scratch, nempty, dir);
              continue;
            }
            const nh = updateManhattan(hManh, scratch, empty, dir, finishPos, false);
            const ng = g + 1;
            const nid = allocState(scratch, ng, nempty, dir, id, nh + <f64>ng, nh, 0, 1);
            if (nid < 0) return -1;
            if (visitF.has(h)) nextHashArr[nid] = visitF.get(h);
            else nextHashArr[nid] = -1;
            visitF.set(h, nid);
            heapF[heapFLen++] = nid;
            expandCnt++;

            let b2 = visitB.has(h) ? visitB.get(h) : -1;
            while (b2 >= 0) {
              if (boardsEqual(b2, scratch)) {
                meetIdF = nid;
                meetIdB = b2;
                break;
              }
              b2 = nextHashArr[b2];
            }
            undoDir(scratch, nempty, dir);
            if (meetIdF >= 0) break;
          }
        } else if (meetIdF < 0) {
          // reached goal board as forward state
          let b2 = visitB.has(hh) ? visitB.get(hh) : -1;
          while (b2 >= 0) {
            if (boardsEqual(b2, scratch)) {
              meetIdF = id;
              meetIdB = b2;
              break;
            }
            b2 = nextHashArr[b2];
          }
        }
      }
    }

    if (meetIdF >= 0) break;

    // ---- backward ----
    if (heapBLen > 0) {
      let bestI = 0;
      for (let i = 1; i < heapBLen; i++) {
        if (heapLess(heapB[i], heapB[bestI])) bestI = i;
      }
      const id = heapB[bestI];
      heapB[bestI] = heapB[--heapBLen];
      if (statusArr[id] == 1) {
        statusArr[id] = 2;
        biCnt++;
        loadBoard(id, scratch);
        const hh = hashBoard(scratch);
        let fid = visitF.has(hh) ? visitF.get(hh) : -1;
        while (fid >= 0) {
          if (boardsEqual(fid, scratch)) {
            meetIdF = fid;
            meetIdB = id;
            break;
          }
          fid = nextHashArr[fid];
        }
        if (meetIdF < 0) {
          const empty = emptyArr[id];
          const g = gArr[id];
          const hManh = hManhArr[id];
          for (let dir: i32 = 0; dir < 4; dir++) {
            if (g > 0 && dir == reverseDir(actionArr[id])) continue;
            if (!canMove(empty, dir)) continue;
            const nempty = applyDir(scratch, empty, dir);
            const h = hashBoard(scratch);
            let existed = visitB.has(h) ? visitB.get(h) : -1;
            let found = false;
            while (existed >= 0) {
              if (boardsEqual(existed, scratch)) {
                found = true;
                break;
              }
              existed = nextHashArr[existed];
            }
            if (found) {
              undoDir(scratch, nempty, dir);
              continue;
            }
            const nh = updateManhattan(hManh, scratch, empty, dir, backGoalPos, false);
            const ng = g + 1;
            const nid = allocState(scratch, ng, nempty, dir, id, nh + <f64>ng, nh, 0, 1);
            if (nid < 0) return -1;
            if (visitB.has(h)) nextHashArr[nid] = visitB.get(h);
            else nextHashArr[nid] = -1;
            visitB.set(h, nid);
            heapB[heapBLen++] = nid;
            expandCnt++;

            let f2 = visitF.has(h) ? visitF.get(h) : -1;
            while (f2 >= 0) {
              if (boardsEqual(f2, scratch)) {
                meetIdF = f2;
                meetIdB = nid;
                break;
              }
              f2 = nextHashArr[f2];
            }
            undoDir(scratch, nempty, dir);
            if (meetIdF >= 0) break;
          }
        }
      }
    }

    biLastEmitCnt = emitTickBi(biCnt, biStartMs, biLastEmitCnt);
  }

  stateCntTotal += stateCount;
  if (meetIdF < 0 || meetIdB < 0) {
    setError("收尾双向还原失败");
    return -1;
  }

  appendPathById(meetIdF, false);
  appendPathById(meetIdB, true);
  return outActionLen - pathStart;
}

// ---- exports ----

export function getInputPtr(): usize {
  return changetype<usize>(inputBuf);
}

export function setWinParams(ww: i32, wh: i32, weight: f64): void {
  winW = ww < 1 ? 1 : ww;
  winH = wh < 1 ? 1 : wh;
  if (weight > 0) winWeight = weight;
}

export function init(w: i32, h: i32, listLen: i32): void {
  width = w;
  height = h;
  n = w * h;
  emptyNum = n - 1;
  clearError();
  stateCntTotal = 0;
  expandCnt = 0;
  outActionLen = 0;
  focusLen = 0;
  for (let i = 0; i < MAX_N; i++) focusMask[i] = 0;
  if (n <= 0) {
    setError("盘面尺寸无效");
    return;
  }
  if (n > MAX_N) {
    setError(
      "盘面过大 n=" + n.toString() + " 超过 MAX_N=" + MAX_N.toString()
    );
    return;
  }
  if (listLen != n) {
    setError(
      "list 长度与宽高不符 listLen=" +
        listLen.toString() +
        " n=" +
        n.toString()
    );
    return;
  }
  for (let i = 0; i < n; i++) {
    const v = inputBuf[i];
    startList[i] = v;
    curList[i] = v;
    finish[i] = u8(i);
  }
  for (let i = 0; i < n; i++) finishPos[<i32>finish[i]] = i;
  buildAdjTable();
}

export function clearSolver(): void {
  outActionLen = 0;
  focusLen = 0;
  stateCntTotal = 0;
  expandCnt = 0;
  clearError();
  progressLen = 0;
  resetSearchPool();
}

export function execAll(): i32 {
  clearError();
  outActionLen = 0;
  stateCntTotal = 0;
  expandCnt = 0;
  focusLen = 0;
  for (let i = 0; i < MAX_N; i++) focusMask[i] = 0;
  copyBoard(curList, startList);
  buildWindows();
  const savedWeight = winWeight;

  for (let wi = 0; wi < winCount; wi++) {
    const left = winLefts[wi];
    const top = winTops[wi];
    const ww = winWs[wi];
    const wh = winHs[wi];
    collectWindowNums(left, top, ww, wh);
    winWeight = savedWeight;

    if (isFocusDone(curList)) {
      setProgress(
        "skip:" +
          left.toString() +
          "," +
          top.toString() +
          "," +
          ww.toString() +
          "x" +
          wh.toString()
      );
      continue;
    }

    setProgress(
      "win:" +
        (wi + 1).toString() +
        "/" +
        winCount.toString() +
        ":" +
        left.toString() +
        "," +
        top.toString() +
        "," +
        ww.toString() +
        "x" +
        wh.toString() +
        ":" +
        focusLen.toString()
    );

    const pathStart = outActionLen;
    const added = solveWindow(left, top, ww, wh);
    if (added < 0) return -1;
    if (added > 0) applyActionsToCur(pathStart, added);
    setProgress(
      "windone:" +
        left.toString() +
        "," +
        top.toString() +
        "," +
        ww.toString() +
        "x" +
        wh.toString() +
        ":" +
        added.toString() +
        ":" +
        outActionLen.toString()
    );
  }

  let needBi = false;
  for (let i = 0; i < n; i++) {
    if (curList[i] != finish[i]) {
      needBi = true;
      break;
    }
  }
  if (needBi) {
    setProgress("bi");
    winWeight = 1.0;
    setAllFocus();
    const added = solveBi();
    winWeight = savedWeight;
    if (added < 0) return -1;
  }

  setProgress(
    "done:" +
      outActionLen.toString() +
      ":" +
      stateCntTotal.toString() +
      ":" +
      winCount.toString() +
      ":" +
      expandCnt.toString()
  );
  return outActionLen;
}

export function getActionsPtr(): usize {
  return changetype<usize>(outActions);
}
export function getActionsLen(): i32 {
  return outActionLen;
}
export function getProgressPtr(): usize {
  return changetype<usize>(progressBuf);
}
export function getProgressLen(): i32 {
  return progressLen;
}
export function getStateCnt(): i32 {
  return stateCntTotal;
}
export function getWinCount(): i32 {
  return winCount;
}
export function getExpandCnt(): i32 {
  return expandCnt;
}
export function getErrorPtr(): usize {
  return changetype<usize>(errorBuf);
}
export function getErrorLen(): i32 {
  return errorLen;
}
export function getWinW(): i32 {
  return winW;
}
export function getWinH(): i32 {
  return winH;
}
export function getWinWeight(): f64 {
  return winWeight;
}
