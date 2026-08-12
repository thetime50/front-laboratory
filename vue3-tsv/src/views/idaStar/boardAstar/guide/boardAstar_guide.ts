import { BoardAstar_opt, StateOpt } from "../opt/boardAstar_opt";

/**
 * 加权引导 A*：继承 BoardAstar_opt，只改计分。
 * - 距空白（终点位）越远，还原权重越大
 * - 左上边界 focus 增强；focus 归位后向四邻扩展
 * - 边界增强权重建议 < 距离权重/3
 */
export class BoardAstar_guide extends BoardAstar_opt {
  /** 距离空白权重系数 */
  distWeight = 6;
  /** 边界/focus 增强权重（建议 < distWeight/3） */
  borderWeight = 1.2;

  /** 初始左上边界 focus（终点位上的数字） */
  private baseFocus = new Set<number>();
  /** 数字 → 相对空白终点的距离归一化 [0,1] */
  private distScale: Record<number, number> = {};

  setGuideParams(distWeight?: number, borderWeight?: number) {
    if (typeof distWeight === "number" && distWeight >= 0) {
      this.distWeight = distWeight;
    }
    if (typeof borderWeight === "number" && borderWeight >= 0) {
      this.borderWeight = borderWeight;
    }
  }

  /** 初始化距离表与左上边界 focus（不含空格） */
  prepareGuide() {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    const emptyFinish = b.finishMap[empty];
    let maxD = 1;
    this.distScale = {};
    this.baseFocus = new Set();

    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const idx = r * w + c;
        const tile = b.finishIdx2Num[idx]?.num;
        if (tile == null || tile === empty) continue;
        const d = b.manhattan(idx, emptyFinish);
        if (d > maxD) maxD = d;
      }
    }
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const idx = r * w + c;
        const tile = b.finishIdx2Num[idx]?.num;
        if (tile == null || tile === empty) continue;
        this.distScale[tile] = b.manhattan(idx, emptyFinish) / maxD;
        if (r === 0 || c === 0) this.baseFocus.add(tile);
      }
    }
  }

  /**
   * 由盘面推导 focus：从左上边界出发，
   * 已归位的 focus 用 finishNum2Idx 四邻扩展未在 focus 内的数字。
   */
  expandFocus(list: number[]): Set<number> {
    const b = this.board;
    const empty = b.emptyNum;
    const focus = new Set(this.baseFocus);
    let changed = true;
    while (changed) {
      changed = false;
      const snapshot = Array.from(focus);
      for (let i = 0; i < snapshot.length; i++) {
        const tile = snapshot[i];
        if (tile === empty) continue;
        const want = b.finishMap[tile];
        if (list[want] !== tile) continue;
        const info = b.finishNum2Idx[tile];
        if (!info) continue;
        for (let k = 0; k < info.adjNum.length; k++) {
          const n = info.adjNum[k];
          if (n === empty || focus.has(n)) continue;
          focus.add(n);
          changed = true;
        }
      }
    }
    return focus;
  }

  /** 加权曼哈顿：基础 1 + 距离权重 +（focus 时）边界权重 */
  getGuideManhattan(list: number[]): number {
    const b = this.board;
    const empty = b.emptyNum;
    const width = b.widthCnt;
    const focus = this.expandFocus(list);
    const dw = this.distWeight;
    const bw = this.borderWeight;
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      const tile = list[i];
      if (tile === empty) continue;
      const origin = b.finishMap[tile];
      const manh =
        Math.abs(Math.floor(i / width) - Math.floor(origin / width)) +
        Math.abs((i % width) - (origin % width));
      const dist = this.distScale[tile] ?? 0;
      // 边界增强权重建议 < 距离权重/3
      const w = 1 + dw * dist + (focus.has(tile) ? bw : 0);
    //   const w = 1 + dw * dist * (focus.has(tile) ? bw : 1);
      sum += manh * w;
    }
    return sum;
  }

  calcGuideValue(gcost: number, list: number[], hcost2 = 0): number {
    return gcost + this.getGuideManhattan(list) + hcost2 / 2;
  }

  applyGuideCost(state: StateOpt, list: number[]) {
    state.cost = this.calcGuideValue(state.gcost, list, state.hcost2);
  }

  openAdd(stateStr: string, state: StateOpt, listForF2f?: number[]) {
    const list = listForF2f || state.list || this.fromKey(stateStr);
    this.applyGuideCost(state, list);
    super.openAdd(stateStr, state, listForF2f);
  }

  calcCost(
    gcost: number,
    hcost: number,
    hcost2: number,
    _pdbCost: number,
    _f2fCost = 0
  ) {
    return gcost + hcost + hcost2 / 2;
  }
}
