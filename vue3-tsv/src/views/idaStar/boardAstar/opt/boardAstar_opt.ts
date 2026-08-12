import { ActionDir, NumBoard } from "../../numBoard";
import { Heap } from "heap-js";
import { PatternDB } from "./boardPdb";
import {
  listToStateKey,
  stateKeyToList,
} from "./boardCode";

/** 与 State3 字段兼容；list 可选（NO_LIST 时不存） */
export class StateOpt {
  public cost: number;
  constructor(
    public action: ActionDir,
    public beforeState: string,
    public gcost: number,
    public hcost: number,
    public hcost2: number,
    public childCnt: number,
    public emptyIndex: number,
    public list: number[] | undefined,
    public pdbCost: number,
    public f2fCost = 0
  ) {
    const baseH = this.hcost + this.hcost2 / 2;
    let h = this.pdbCost > baseH ? this.pdbCost : baseH;
    if (this.f2fCost > h) h = this.f2fCost;
    this.cost = this.gcost + h;
  }
}

export type AstarOptFlags = {
  usePdb: boolean;
  useCompact: boolean;
  useNoList: boolean;
  useFrontToFront: boolean;
};

/** Front-to-Front 对侧前沿采样上限 */
const F2F_SAMPLE_MAX = 48;

/**
 * 优化版单向 A*：紧凑 key / 不存 list / PDB 启发
 * 对外接口与 BoardAstar_h 对齐，便于 Bi 搜索复用
 */
export class BoardAstar_opt {
  openSet: Record<string, StateOpt> = {};
  closeSet: Record<string, StateOpt> = {};
  openQueue: Heap<string> = new Heap(
    (a, b) =>
      this.openSet[a].cost - this.openSet[b].cost ||
      this.openSet[b].gcost - this.openSet[a].gcost
  );
  board = new NumBoard();
  removeSet = new Set<string>();
  remoceCnt = 0;
  pdb: PatternDB | null = null;
  flags: AstarOptFlags = {
    usePdb: false,
    useCompact: false,
    useNoList: false,
    useFrontToFront: false,
  };
  /** Meet 上界：f >= meetBound 的节点不扩展/不入队；Infinity 表示未启用 */
  meetBound = Infinity;
  /** MM：用 max(2g, g+h) 作优先（Near-MM 风格） */
  useMmPriority = false;
  /** Front-to-Front：对侧搜索引擎 */
  opposite: BoardAstar_opt | null = null;
  /** 本侧近期入队状态，供对侧 F2F 采样（存 list 快照） */
  f2fRecent: number[][] = [];

  setFlags(flags: Partial<AstarOptFlags> & { useMmPriority?: boolean }) {
    if (typeof flags.usePdb === "boolean") this.flags.usePdb = flags.usePdb;
    if (typeof flags.useCompact === "boolean") this.flags.useCompact = flags.useCompact;
    if (typeof flags.useNoList === "boolean") this.flags.useNoList = flags.useNoList;
    if (typeof flags.useFrontToFront === "boolean")
      this.flags.useFrontToFront = flags.useFrontToFront;
    if (typeof flags.useMmPriority === "boolean") {
      this.useMmPriority = flags.useMmPriority;
    }
    this.openQueue = new Heap(
      (a, b) =>
        this.priority(this.openSet[a]) - this.priority(this.openSet[b]) ||
        this.openSet[b].gcost - this.openSet[a].gcost
    );
  }

  priority(state: StateOpt): number {
    if (!this.useMmPriority) return state.cost;
    const h = state.cost - state.gcost;
    return Math.max(2 * state.gcost, state.gcost + h);
  }

  minOpenCost(): number {
    if (!this.openQueue.size()) return Infinity;
    const top = this.openQueue.peek();
    if (top == null) return Infinity;
    const st = this.openSet[top];
    if (!st) return Infinity;
    return this.useMmPriority ? this.priority(st) : st.cost;
  }

  setFinishList(list: number[] | string, check = true) {
    this.board.setFinishtList(list, check);
  }

  init(widthCnt: number, heightCnt: number, list?: number[]) {
    this.clear();
    this.board.setSize(widthCnt, heightCnt);
    list && this.board.setList(list);
  }

  clear() {
    this.openSet = {};
    this.closeSet = {};
    this.openQueue.clear();
    this.removeSet.clear();
    this.remoceCnt = 0;
    this.meetBound = Infinity;
    this.pdb = null;
    this.f2fRecent = [];
  }

  /** 两状态间曼哈顿距离（以 b 的棋子位置为目标） */
  manhattanBetween(a: number[], b: number[]): number {
    const width = this.board.widthCnt;
    const emptyNum = this.board.emptyNum;
    const posB = new Array(b.length);
    for (let i = 0; i < b.length; i++) posB[b[i]] = i;
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const tile = a[i];
      if (tile === emptyNum) continue;
      const j = posB[tile];
      const x1 = Math.floor(i / width);
      const y1 = i % width;
      const x2 = Math.floor(j / width);
      const y2 = j % width;
      sum += Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
    return sum;
  }

  /** 供对侧读取的 F2F 样本：近期入队 + 当前 open 堆顶 */
  getF2FSamples(): number[][] {
    const samples = this.f2fRecent.slice();
    const top = this.openQueue.peek();
    if (top != null) {
      const st = this.openSet[top];
      if (st) {
        const list = st.list || this.fromKey(top);
        samples.push(list);
      }
    }
    return samples;
  }

  /**
   * Front-to-Front：h_FF(n) = min_{m ∈ 对侧前沿样本} manhattan(n, m)
   * 再与目标启发取 max，保持可采纳且更紧
   */
  frontToFrontH(list: number[]): number {
    if (!this.flags.useFrontToFront || !this.opposite) return 0;
    const samples = this.opposite.getF2FSamples();
    if (!samples.length) return 0;
    let minH = Infinity;
    for (let i = 0; i < samples.length; i++) {
      const h = this.manhattanBetween(list, samples[i]);
      if (h < minH) minH = h;
    }
    return minH === Infinity ? 0 : minH;
  }

  pushF2FRecent(list: number[]) {
    if (!this.flags.useFrontToFront) return;
    this.f2fRecent.push(list.concat());
    if (this.f2fRecent.length > F2F_SAMPLE_MAX) {
      this.f2fRecent.splice(0, this.f2fRecent.length - F2F_SAMPLE_MAX);
    }
  }

  ensurePdb() {
    if (!this.flags.usePdb) {
      this.pdb = null;
      return;
    }
    this.pdb = PatternDB.getOrBuild(this.board);
  }

  toKey(list: number[]): string {
    return listToStateKey(list, this.flags.useCompact);
  }

  fromKey(key: string): number[] {
    return stateKeyToList(key, this.flags.useCompact);
  }

  /** 兼容外部：finish / listStr 在非 compact 时仍为逗号串；compact 时内部用编码串 */
  get finishKey(): string {
    const finish = this.board.finishStr.split(",").map((v) => Number(v));
    return this.toKey(finish);
  }

  get startKey(): string {
    return this.toKey(this.board.list);
  }

  haveState(stateStr: string) {
    return this.openSet[stateStr] || this.closeSet[stateStr];
  }

  getState(stateStr: string): StateOpt | undefined {
    return this.openSet[stateStr] || this.closeSet[stateStr];
  }

  openAdd(stateStr: string, state: StateOpt, listForF2f?: number[]) {
    this.openSet[stateStr] = state;
    this.openQueue.add(stateStr);
    if (listForF2f) this.pushF2FRecent(listForF2f);
  }

  calcCost(
    gcost: number,
    hcost: number,
    hcost2: number,
    pdbCost: number,
    f2fCost = 0
  ) {
    const baseH = hcost + hcost2 / 2;
    let h = pdbCost > baseH ? pdbCost : baseH;
    if (f2fCost > h) h = f2fCost;
    return gcost + h;
  }

  resolveList(stateStr: string, state: StateOpt): number[] {
    if (state.list) return state.list;
    return this.fromKey(stateStr);
  }

  *execStep(): Generator<string, void, unknown> {
    for (; this.openQueue.size(); ) {
      const stateStr = this.openQueue.pop()!;
      const state = this.openSet[stateStr];
      if (!state) continue;

      const nodePri = this.useMmPriority ? this.priority(state) : state.cost;
      if (nodePri >= this.meetBound) {
        delete this.openSet[stateStr];
        continue;
      }

      this.closeSet[stateStr] = state;
      delete this.openSet[stateStr];

      const list = this.resolveList(stateStr, state);
      this.board.setList(list, false);
      // setList 会重算 emptyIndex；与 state 对齐
      if (this.board.emptyIndex !== state.emptyIndex) {
        this.board.emptyIndex = state.emptyIndex;
      }

      const child = this.board.getCanActoinDir(
        this.board.emptyIndex,
        state.beforeState ? state.action : undefined
      );
      for (const v of child) {
        const nlist = this.board.doAction(v, false);
        const emptyBefore = this.board.emptyIndex;
        // doAction(false) 不改 emptyIndex，新空位：
        let emptyAfter = emptyBefore;
        if (v === ActionDir.u) emptyAfter = emptyBefore - this.board.widthCnt;
        else if (v === ActionDir.r) emptyAfter = emptyBefore + 1;
        else if (v === ActionDir.d) emptyAfter = emptyBefore + this.board.widthCnt;
        else if (v === ActionDir.l) emptyAfter = emptyBefore - 1;

        const nstateStr = this.toKey(nlist);
        const hcost = this.board.updateManhattan(
          state.hcost,
          nlist,
          emptyBefore,
          v
        );
        const hcost2 = this.board.updateAdjacent(
          state.hcost2,
          nlist,
          emptyBefore,
          v
        );
        const pdbCost = this.pdb ? this.pdb.lookup(nlist) : 0;
        const f2fCost = this.frontToFrontH(nlist);
        const cost = this.calcCost(
          state.gcost + 1,
          hcost,
          hcost2,
          pdbCost,
          f2fCost
        );
        if (cost >= this.meetBound) {
          continue;
        }

        const nstate = new StateOpt(
          v,
          stateStr,
          state.gcost + 1,
          hcost,
          hcost2,
          0,
          emptyAfter,
          this.flags.useNoList ? undefined : nlist,
          pdbCost,
          f2fCost
        );

        const closState = this.closeSet[nstateStr];
        if (closState) {
          continue;
        }
        const openState = this.openSet[nstateStr];
        if (!openState) {
          this.openAdd(nstateStr, nstate, nlist);
          state.childCnt += 1;
          yield nstateStr;
        }
      }
      if (state.childCnt <= 0) {
        this.removeSet.add(stateStr);
      }
    }
  }

  execInit() {
    this.ensurePdb();
    const list = this.board.list.concat();
    const key = this.toKey(list);
    const hcost = this.board.getManhattan();
    const hcost2 = this.board.getAdjacent();
    const pdbCost = this.pdb ? this.pdb.lookup(list) : 0;
    const f2fCost = this.frontToFrontH(list);
    this.openAdd(
      key,
      new StateOpt(
        ActionDir.d,
        "",
        0,
        hcost,
        hcost2,
        0,
        this.board.emptyIndex,
        this.flags.useNoList ? undefined : list,
        pdbCost,
        f2fCost
      ),
      list
    );
  }

  getPath(stateStr: string) {
    const lastState = this.closeSet[stateStr] || this.openSet[stateStr];
    if (!lastState) return [];
    const stateArr: StateOpt[] = [];
    let currentState: StateOpt | undefined = lastState;
    while (currentState && currentState.beforeState) {
      stateArr.push(currentState);
      currentState = this.closeSet[currentState.beforeState];
    }
    stateArr.reverse();
    return stateArr.map((v) => v.action);
  }

  removeTest() {
    const removeArr = Array.from(this.removeSet);
    for (let i = 0; i < removeArr.length; i++) {
      const stateStr = removeArr[i];
      const state = this.closeSet[stateStr];
      if (!state) continue;
      const pstr = state.beforeState;
      if (!pstr) continue;
      const parent = this.closeSet[pstr];
      if (!parent) continue;
      parent.childCnt -= 1;
      if (parent.childCnt <= 0) {
        removeArr.push(pstr);
        this.removeSet.add(pstr);
      }
    }
    removeArr.forEach((v) => {
      delete this.closeSet[v];
    });
    console.log(`清理内存${removeArr.length}条数据`);
    this.remoceCnt += removeArr.length;
    this.removeSet.clear();
  }
}
