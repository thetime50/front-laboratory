import { ActionDir, NumBoard } from "../../numBoard";

/**
 * Pattern Database：对目标态做抽象 BFS，记录图案棋子最短步数。
 * 任意尺寸：按 P(n, k+1) 预算自动选图案大小（含空格）。
 */

const PDB_CACHE = new Map<string, PatternDB>();
/** 状态规模上限，避免构建过久/内存过大 */
const PDB_MAX_STATES = 1_200_000;

function permCount(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
}

function choosePatternK(n: number): number {
  // 含空格共 k+1 个位置：P(n, k+1) <= PDB_MAX_STATES
  let k = Math.min(6, n - 1);
  while (k > 1 && permCount(n, k + 1) > PDB_MAX_STATES) k--;
  return Math.max(1, k);
}

/** 对有序列（图案棋子位置 + 空格位置）做排列秩 */
function rankPerm(positions: number[], n: number): number {
  const used = new Array(n).fill(false);
  let rank = 0;
  const k = positions.length;
  for (let i = 0; i < k; i++) {
    const p = positions[i];
    let cnt = 0;
    for (let j = 0; j < p; j++) {
      if (!used[j]) cnt++;
    }
    rank += cnt * permCount(n - i - 1, k - i - 1);
    used[p] = true;
  }
  return rank;
}

export class PatternDB {
  readonly tiles: number[]; // 图案棋子（不含空格），固定顺序
  readonly emptyNum: number;
  readonly n: number;
  readonly table: Uint16Array;
  readonly widthCnt: number;
  readonly heightCnt: number;

  constructor(
    tiles: number[],
    emptyNum: number,
    n: number,
    widthCnt: number,
    heightCnt: number,
    table: Uint16Array
  ) {
    this.tiles = tiles;
    this.emptyNum = emptyNum;
    this.n = n;
    this.widthCnt = widthCnt;
    this.heightCnt = heightCnt;
    this.table = table;
  }

  indexOf(list: number[]): number {
    const tilePos = new Array(this.tiles.length);
    let empty = -1;
    for (let j = 0; j < list.length; j++) {
      const v = list[j];
      if (v === this.emptyNum) empty = j;
      else {
        for (let i = 0; i < this.tiles.length; i++) {
          if (this.tiles[i] === v) tilePos[i] = j;
        }
      }
    }
    return rankPerm([...tilePos, empty], this.n);
  }

  lookup(list: number[]): number {
    const idx = this.indexOf(list);
    const v = this.table[idx];
    return v === 0xffff ? 0 : v;
  }

  static cacheKey(
    widthCnt: number,
    heightCnt: number,
    finishStr: string,
    tiles: number[]
  ): string {
    return `${widthCnt}x${heightCnt}|${finishStr}|${tiles.join(",")}`;
  }

  static getOrBuild(board: NumBoard): PatternDB | null {
    const n = board.widthCnt * board.heightCnt;
    if (n <= 1) return null;
    const k = choosePatternK(n);
    // 取目标态下编号较小的非空格棋子作为图案（稳定、与尺寸无关）
    const finish = board.finishStr.split(",").map((v) => Number(v));
    const candidates = finish
      .filter((v) => v !== board.emptyNum)
      .sort((a, b) => a - b);
    const tiles = candidates.slice(0, k);
    const key = PatternDB.cacheKey(
      board.widthCnt,
      board.heightCnt,
      board.finishStr,
      tiles
    );
    const hit = PDB_CACHE.get(key);
    if (hit) return hit;

    const db = PatternDB.build(board, tiles);
    PDB_CACHE.set(key, db);
    return db;
  }

  static build(board: NumBoard, tiles: number[]): PatternDB {
    const n = board.widthCnt * board.heightCnt;
    const width = board.widthCnt;
    const emptyNum = board.emptyNum;
    const tableSize = permCount(n, tiles.length + 1);
    const table = new Uint16Array(tableSize);
    table.fill(0xffff);

    const finish = board.finishStr.split(",").map((v) => Number(v));
    // 抽象态：仅保留图案棋子与空格，其余用 -1
    const abstract = (list: number[]) => {
      const a = new Array(n);
      for (let i = 0; i < n; i++) {
        const v = list[i];
        if (v === emptyNum || tiles.indexOf(v) >= 0) a[i] = v;
        else a[i] = -1;
      }
      return a;
    };

    const stateKey = (list: number[]) => {
      // 用位置秩作 visited；同时需要空位做扩展
      return rankPerm(
        [
          ...tiles.map((t) => {
            for (let i = 0; i < n; i++) if (list[i] === t) return i;
            return -1;
          }),
          (() => {
            for (let i = 0; i < n; i++) if (list[i] === emptyNum) return i;
            return -1;
          })(),
        ],
        n
      );
    };

    const start = abstract(finish);
    const emptyIndex = start.indexOf(emptyNum);
    const startIdx = stateKey(start);
    table[startIdx] = 0;

    const queue: { list: number[]; empty: number; d: number }[] = [
      { list: start, empty: emptyIndex, d: 0 },
    ];
    let qh = 0;
    const dirs = [ActionDir.u, ActionDir.r, ActionDir.d, ActionDir.l];
    const can = (empty: number, dir: ActionDir) => {
      if (dir === ActionDir.u) return empty >= width;
      if (dir === ActionDir.r) return empty % width !== width - 1;
      if (dir === ActionDir.d) return empty + width < n;
      if (dir === ActionDir.l) return empty % width !== 0;
      return false;
    };
    const moveEmpty = (empty: number, dir: ActionDir) => {
      if (dir === ActionDir.u) return empty - width;
      if (dir === ActionDir.r) return empty + 1;
      if (dir === ActionDir.d) return empty + width;
      return empty - 1;
    };

    while (qh < queue.length) {
      const cur = queue[qh++];
      for (const dir of dirs) {
        if (!can(cur.empty, dir)) continue;
        const other = moveEmpty(cur.empty, dir);
        const nlist = cur.list.slice();
        nlist[cur.empty] = nlist[other];
        nlist[other] = emptyNum;
        // 非图案交换：抽象后空格移动，对方格仍是 -1
        const idx = stateKey(nlist);
        if (table[idx] !== 0xffff) continue;
        const nd = cur.d + 1;
        table[idx] = nd;
        queue.push({ list: nlist, empty: other, d: nd });
      }
    }

    return new PatternDB(
      tiles,
      emptyNum,
      n,
      board.widthCnt,
      board.heightCnt,
      table
    );
  }
}
