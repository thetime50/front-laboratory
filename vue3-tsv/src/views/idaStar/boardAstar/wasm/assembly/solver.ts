/**
 * 开窗双向 A* WASM 核心（AssemblyScript）
 * 对齐 BoardBiAstarWin：分窗单向 A* + 收尾双向 A*
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

const focusArr = new StaticArray<i32>(MAX_FOCUS);
let focusLen: i32 = 0;

const winLefts = new StaticArray<i32>(MAX_WINDOWS);
const winTops = new StaticArray<i32>(MAX_WINDOWS);
const winWs = new StaticArray<i32>(MAX_WINDOWS);
const winHs = new StaticArray<i32>(MAX_WINDOWS);
let winCount: i32 = 0;

const outActions = new StaticArray<u8>(MAX_PATH);
let outActionLen: i32 = 0;

const progressBuf = new StaticArray<u8>(MAX_PROGRESS);
let progressLen: i32 = 0;

const errorBuf = new StaticArray<u8>(MAX_ERROR);
let errorLen: i32 = 0;

let stateCntTotal: i32 = 0;
let expandCnt: i32 = 0;

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

/** 开窗阶段进度：tickwin:left,top,wxh:cnt:ms */
function emitTickWin(
  left: i32,
  top: i32,
  ww: i32,
  wh: i32,
  cnt: i32,
  startMs: f64,
  lastLogMs: f64
): f64 {
  const now = js_now_ms();
  if (cnt <= 0 || now - lastLogMs <= 500.0) return lastLogMs;
  const dur = now - startMs;
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
      (<i32>dur).toString()
  );
  return now;
}

/** 收尾双向进度：tickbi:cnt:ms */
function emitTickBi(cnt: i32, startMs: f64, lastLogMs: f64): f64 {
  const now = js_now_ms();
  if (cnt <= 0 || now - lastLogMs <= 500.0) return lastLogMs;
  const dur = now - startMs;
  setProgress(
    "tickbi:" + cnt.toString() + ":" + (<i32>dur).toString()
  );
  return now;
}

function copyBoard(dst: StaticArray<u8>, src: StaticArray<u8>): void {
  for (let i = 0; i < n; i++) dst[i] = src[i];
}

function boardKey(list: StaticArray<u8>): string {
  let s = "";
  for (let i = 0; i < n; i++) s += String.fromCharCode(list[i]);
  return s;
}

function decodeKey(key: string, out: StaticArray<u8>): void {
  for (let i = 0; i < n; i++) out[i] = u8(key.charCodeAt(i) & 0xff);
}

function findEmpty(list: StaticArray<u8>): i32 {
  for (let i = 0; i < n; i++) {
    if (<i32>list[i] == emptyNum) return i;
  }
  return n - 1;
}

function focusHas(tile: i32): bool {
  for (let k = 0; k < focusLen; k++) {
    if (focusArr[k] == tile) return true;
  }
  return false;
}

function getAdjacent(list: StaticArray<u8>): f64 {
  let total: f64 = 0;
  const pos = new StaticArray<i32>(MAX_N);
  for (let i = 0; i < n; i++) pos[<i32>list[i]] = i;
  for (let i = 0; i < n; i++) {
    const num = <i32>finish[i];
    if (num == emptyNum) continue;
    if (i % width != width - 1) {
      const num2 = <i32>finish[i + 1];
      if (num2 != emptyNum) total += <f64>(manh(pos[num], pos[num2]) - 1);
    }
    if (i / width != height - 1) {
      const num2 = <i32>finish[i + width];
      if (num2 != emptyNum) total += <f64>(manh(pos[num], pos[num2]) - 1);
    }
  }
  return total;
}

/** goalPos[tile] = 目标下标 */
function manhattanTo(list: StaticArray<u8>, goalPos: StaticArray<i32>, weighted: bool): f64 {
  let sum: f64 = 0;
  for (let i = 0; i < n; i++) {
    const tile = <i32>list[i];
    if (tile == emptyNum) continue;
    const m = <f64>manh(i, goalPos[tile]);
    sum += weighted && focusHas(tile) ? m * winWeight : m;
  }
  return sum;
}

function calcWinValue(g: i32, list: StaticArray<u8>): f64 {
  return <f64>g + manhattanTo(list, finishPos, true) + getAdjacent(list) / 2.0;
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

class Node {
  g: i32;
  empty: i32;
  action: i32;
  parentKey: string;
  cost: f64;
  constructor(g: i32, empty: i32, action: i32, parentKey: string, cost: f64) {
    this.g = g;
    this.empty = empty;
    this.action = action;
    this.parentKey = parentKey;
    this.cost = cost;
  }
}

class HeapItem {
  key: string;
  cost: f64;
  g: i32;
  constructor(key: string, cost: f64, g: i32) {
    this.key = key;
    this.cost = cost;
    this.g = g;
  }
}

class MinHeap {
  data: HeapItem[] = [];
  get size(): i32 {
    return this.data.length;
  }
  push(item: HeapItem): void {
    this.data.push(item);
    this.siftUp(this.data.length - 1);
  }
  pop(): HeapItem | null {
    const len = this.data.length;
    if (len == 0) return null;
    const top = this.data[0];
    const last = this.data.pop();
    if (len > 1 && last) {
      this.data[0] = last;
      this.siftDown(0);
    }
    return top;
  }
  private less(a: HeapItem, b: HeapItem): bool {
    if (a.cost != b.cost) return a.cost < b.cost;
    return a.g > b.g;
  }
  private siftUp(i: i32): void {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (!this.less(this.data[i], this.data[p])) break;
      const tmp = this.data[i];
      this.data[i] = this.data[p];
      this.data[p] = tmp;
      i = p;
    }
  }
  private siftDown(i: i32): void {
    const len = this.data.length;
    while (true) {
      let smallest = i;
      const l = i * 2 + 1;
      const r = l + 1;
      if (l < len && this.less(this.data[l], this.data[smallest])) smallest = l;
      if (r < len && this.less(this.data[r], this.data[smallest])) smallest = r;
      if (smallest == i) break;
      const tmp = this.data[i];
      this.data[i] = this.data[smallest];
      this.data[smallest] = tmp;
      i = smallest;
    }
  }
}

function pushOutAction(a: i32): void {
  if (outActionLen < MAX_PATH) outActions[outActionLen++] = u8(a);
}

function appendPath(map: Map<string, Node>, meetKey: string, revDir: bool): void {
  const acts = new Array<i32>();
  let key = meetKey;
  while (key.length > 0 && map.has(key)) {
    const node = map.get(key);
    if (node.parentKey.length == 0) break;
    acts.push(node.action);
    key = node.parentKey;
  }
  for (let i = acts.length - 1; i >= 0; i--) {
    let a = acts[i];
    if (revDir) a = reverseDir(a);
    pushOutAction(a);
  }
}

function mergeMaps(a: Map<string, Node>, b: Map<string, Node>): Map<string, Node> {
  const m = new Map<string, Node>();
  const ka = a.keys();
  for (let i = 0; i < ka.length; i++) m.set(ka[i], a.get(ka[i]));
  const kb = b.keys();
  for (let i = 0; i < kb.length; i++) m.set(kb[i], b.get(kb[i]));
  return m;
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
    }
  }
}

function setAllFocus(): void {
  focusLen = 0;
  for (let i = 0; i < n; i++) {
    const tile = <i32>finish[i];
    if (tile != emptyNum) focusArr[focusLen++] = tile;
  }
}

function solveWindow(left: i32, top: i32, ww: i32, wh: i32): i32 {
  const pathStart = outActionLen;
  if (isFocusDone(curList)) return 0;

  const openMap = new Map<string, Node>();
  const closeMap = new Map<string, Node>();
  const heap = new MinHeap();
  const scratch = new StaticArray<u8>(MAX_N);

  const startKey = boardKey(curList);
  const startEmpty = findEmpty(curList);
  const startCost = calcWinValue(0, curList);
  openMap.set(startKey, new Node(0, startEmpty, DIR_D, "", startCost));
  heap.push(new HeapItem(startKey, startCost, 0));

  let localExpand: i32 = 0;
  const startMs = js_now_ms();
  let lastLogMs = startMs;

  while (heap.size > 0) {
    const item = heap.pop();
    if (!item || !openMap.has(item.key)) continue;
    const state = openMap.get(item.key);
    if (state.cost != item.cost) continue;
    openMap.delete(item.key);
    closeMap.set(item.key, state);

    decodeKey(item.key, scratch);
    if (isFocusDone(scratch)) {
      appendPath(closeMap, item.key, false);
      stateCntTotal += openMap.size + closeMap.size;
      expandCnt += localExpand;
      return outActionLen - pathStart;
    }

    for (let dir: i32 = 0; dir < 4; dir++) {
      if (state.g > 0 && dir == reverseDir(state.action)) continue;
      if (!canMove(state.empty, dir)) continue;
      decodeKey(item.key, scratch);
      const nempty = applyDir(scratch, state.empty, dir);
      const nkey = boardKey(scratch);
      if (closeMap.has(nkey) || openMap.has(nkey)) continue;
      const ng = state.g + 1;
      const ncost = calcWinValue(ng, scratch);
      openMap.set(nkey, new Node(ng, nempty, dir, item.key, ncost));
      heap.push(new HeapItem(nkey, ncost, ng));
      localExpand++;
    }
    lastLogMs = emitTickWin(left, top, ww, wh, localExpand, startMs, lastLogMs);
  }

  stateCntTotal += openMap.size + closeMap.size;
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
  const fStartKey = boardKey(curList);
  const bStartKey = boardKey(finish);
  if (fStartKey == bStartKey) return 0;

  // 反向目标位置：curList
  const backGoalPos = new StaticArray<i32>(MAX_N);
  for (let i = 0; i < n; i++) backGoalPos[<i32>curList[i]] = i;

  const fOpen = new Map<string, Node>();
  const fClose = new Map<string, Node>();
  const bOpen = new Map<string, Node>();
  const bClose = new Map<string, Node>();
  const fHeap = new MinHeap();
  const bHeap = new MinHeap();
  const scratch = new StaticArray<u8>(MAX_N);

  const fEmpty = findEmpty(curList);
  let fH = manhattanTo(curList, finishPos, false);
  fOpen.set(fStartKey, new Node(0, fEmpty, DIR_D, "", fH));
  fHeap.push(new HeapItem(fStartKey, fH, 0));

  const bEmpty = findEmpty(finish);
  let bH = manhattanTo(finish, backGoalPos, false);
  bOpen.set(bStartKey, new Node(0, bEmpty, DIR_D, "", bH));
  bHeap.push(new HeapItem(bStartKey, bH, 0));

  let meet = "";
  let biCnt: i32 = 0;
  const biStartMs = js_now_ms();
  let biLastLogMs = biStartMs;

  while ((fHeap.size > 0 || bHeap.size > 0) && meet.length == 0) {
    // forward
    if (fHeap.size > 0) {
      const item = fHeap.pop();
      if (item && fOpen.has(item.key)) {
        const state = fOpen.get(item.key);
        if (state.cost == item.cost) {
          fOpen.delete(item.key);
          fClose.set(item.key, state);
          biCnt++;
          if (item.key == bStartKey || bOpen.has(item.key) || bClose.has(item.key)) {
            meet = item.key;
          } else {
            for (let dir: i32 = 0; dir < 4; dir++) {
              if (state.g > 0 && dir == reverseDir(state.action)) continue;
              if (!canMove(state.empty, dir)) continue;
              decodeKey(item.key, scratch);
              const nempty = applyDir(scratch, state.empty, dir);
              const nkey = boardKey(scratch);
              if (fClose.has(nkey) || fOpen.has(nkey)) continue;
              const ng = state.g + 1;
              const ncost = <f64>ng + manhattanTo(scratch, finishPos, false);
              fOpen.set(nkey, new Node(ng, nempty, dir, item.key, ncost));
              fHeap.push(new HeapItem(nkey, ncost, ng));
              expandCnt++;
              if (bOpen.has(nkey) || bClose.has(nkey)) {
                meet = nkey;
                break;
              }
            }
          }
        }
      }
    }
    if (meet.length > 0) break;
    // backward
    if (bHeap.size > 0) {
      const item = bHeap.pop();
      if (item && bOpen.has(item.key)) {
        const state = bOpen.get(item.key);
        if (state.cost == item.cost) {
          bOpen.delete(item.key);
          bClose.set(item.key, state);
          biCnt++;
          if (item.key == fStartKey || fOpen.has(item.key) || fClose.has(item.key)) {
            meet = item.key;
          } else {
            for (let dir: i32 = 0; dir < 4; dir++) {
              if (state.g > 0 && dir == reverseDir(state.action)) continue;
              if (!canMove(state.empty, dir)) continue;
              decodeKey(item.key, scratch);
              const nempty = applyDir(scratch, state.empty, dir);
              const nkey = boardKey(scratch);
              if (bClose.has(nkey) || bOpen.has(nkey)) continue;
              const ng = state.g + 1;
              const ncost = <f64>ng + manhattanTo(scratch, backGoalPos, false);
              bOpen.set(nkey, new Node(ng, nempty, dir, item.key, ncost));
              bHeap.push(new HeapItem(nkey, ncost, ng));
              expandCnt++;
              if (fOpen.has(nkey) || fClose.has(nkey)) {
                meet = nkey;
                break;
              }
            }
          }
        }
      }
    }
    biLastLogMs = emitTickBi(biCnt, biStartMs, biLastLogMs);
  }

  stateCntTotal += fOpen.size + fClose.size + bOpen.size + bClose.size;
  if (meet.length == 0) {
    setError("收尾双向还原失败");
    return -1;
  }

  appendPath(mergeMaps(fClose, fOpen), meet, false);
  appendPath(mergeMaps(bClose, bOpen), meet, true);
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
}

export function clearSolver(): void {
  outActionLen = 0;
  focusLen = 0;
  stateCntTotal = 0;
  expandCnt = 0;
  clearError();
  progressLen = 0;
}

export function execAll(): i32 {
  clearError();
  outActionLen = 0;
  stateCntTotal = 0;
  expandCnt = 0;
  focusLen = 0;
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
        "skip:" + left.toString() + "," + top.toString() + "," + ww.toString() + "x" + wh.toString()
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
