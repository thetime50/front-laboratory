import { BoardAstar_opt, StateOpt } from "./boardAstar_opt";

export type WinRect = {
  left: number;
  top: number;
  w: number;
  h: number;
};

/**
 * 开窗 A*：继承 BoardAstar_opt，不改父类文件。
 * 用「开窗价值」排序：开窗内数字的曼哈顿 * 权重，提高开窗数字优先级。
 * 方块目标在开窗内即可，当前可以在区域外。
 */
export class BoardAstar_win extends BoardAstar_opt {
  /** 开窗宽（格） */
  winW = 2;
  /** 开窗高（格） */
  winH = 2;
  /** 开窗数字相对原始启发的权重（>1 更优先归位开窗数字） */
  winWeight = 4;

  winLeft = 0;
  winTop = 0;

  /** 当前开窗矩形内「目标位置」对应的数字（不含空格） */
  windowNums = new Set<number>();
  /** 实际参与开窗价值/完成判定的数字（可含历史开窗累计） */
  focusNums = new Set<number>();

  setWinSize(winW: number, winH: number, winWeight?: number) {
    this.winW = Math.max(1, winW | 0);
    this.winH = Math.max(1, winH | 0);
    if (typeof winWeight === "number" && winWeight > 0) {
      this.winWeight = winWeight;
    }
  }

  /**
   * 设置当前开窗；focusNums 不传则只用本窗数字。
   * 开窗完成后应带着累计 focus 调用并重建队列。
   */
  setWindow(rect: WinRect, focusNums?: Iterable<number>) {
    const bw = this.board.widthCnt;
    const bh = this.board.heightCnt;
    this.winLeft = Math.max(0, Math.min(rect.left, Math.max(0, bw - 1)));
    this.winTop = Math.max(0, Math.min(rect.top, Math.max(0, bh - 1)));
    this.winW = Math.max(1, Math.min(rect.w, bw - this.winLeft));
    this.winH = Math.max(1, Math.min(rect.h, bh - this.winTop));

    this.windowNums = this.collectWindowNums(this.winLeft, this.winTop, this.winW, this.winH);
    this.focusNums = new Set(focusNums ?? this.windowNums);
  }

  /** 目标位置落在开窗内的数字（棋子可在窗外） */
  collectWindowNums(left: number, top: number, w: number, h: number): Set<number> {
    const nums = new Set<number>();
    const empty = this.board.emptyNum;
    const finish = this.board.finishStr.split(",").map((v) => Number(v));
    const bw = this.board.widthCnt;
    for (let r = top; r < top + h; r++) {
      for (let c = left; c < left + w; c++) {
        const idx = r * bw + c;
        const tile = finish[idx];
        if (tile !== empty) nums.add(tile);
      }
    }
    return nums;
  }

  /** 开窗启发：开窗/focus 内数字 * 权重，其余保持原始曼哈顿 */
  getWinManhattan(list: number[]): number {
    const empty = this.board.emptyNum;
    const width = this.board.widthCnt;
    const focus = this.focusNums;
    const weight = this.winWeight;
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      const tile = list[i];
      if (tile === empty) continue;
      const origin = this.board.finishMap[tile];
      const manh =
        Math.abs(Math.floor(i / width) - Math.floor(origin / width)) +
        Math.abs((i % width) - (origin % width));
      sum += focus.has(tile) ? manh * weight : manh;
    }
    return sum;
  }

  /**
   * 开窗价值（实际排序键）
   * = g + 开窗曼哈顿启发（开窗数字已加权）+ 相邻项/2（与父类同量级）
   */
  calcWinValue(gcost: number, list: number[], hcost2 = 0): number {
    return gcost + this.getWinManhattan(list) + hcost2 / 2;
  }

  /** focus 数字是否都已在目标位（与是否在开窗矩形内无关） */
  isFocusDone(list?: number[]): boolean {
    const ll = list || this.board.list;
    const empty = this.board.emptyNum;
    for (const tile of this.focusNums) {
      if (tile === empty) continue;
      const want = this.board.finishMap[tile];
      if (ll[want] !== tile) return false;
    }
    return true;
  }

  applyWinCost(state: StateOpt, list: number[]) {
    state.cost = this.calcWinValue(state.gcost, list, state.hcost2);
  }

  /** 开窗切换后：按新开窗价值重算 open 并重建堆 */
  refreshWinOrder() {
    const entries = Object.keys(this.openSet);
    for (let i = 0; i < entries.length; i++) {
      const key = entries[i];
      const st = this.openSet[key];
      if (!st) continue;
      const list = this.resolveList(key, st);
      this.applyWinCost(st, list);
    }
    this.openQueue.clear();
    for (let i = 0; i < entries.length; i++) {
      this.openQueue.add(entries[i]);
    }
  }

  openAdd(stateStr: string, state: StateOpt, listForF2f?: number[]) {
    const list =
      listForF2f ||
      state.list ||
      this.fromKey(stateStr);
    this.applyWinCost(state, list);
    super.openAdd(stateStr, state, listForF2f);
  }

  calcCost(
    gcost: number,
    hcost: number,
    hcost2: number,
    _pdbCost: number,
    _f2fCost = 0
  ) {
    // 无 list 时退回未加权（meet 未启用）；真正排序在 openAdd/applyWinCost
    return gcost + hcost + hcost2 / 2;
  }
}
