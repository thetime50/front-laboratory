import { ActionDir } from "../../numBoard";
import { BoardAstar_opt, StateOpt } from "../opt/boardAstar_opt";

/**
 * 加权引导 A*：继承 BoardAstar_opt，只改计分。
 * - 距空白（终点位）越远，还原权重越大
 * - 左上边界 focus 增强；focus 归位后向四邻扩展
 * - 边界增强权重建议 < 距离权重/3
 * - focus 整轮全局累积，只在初始化与归位扩展时 add
 */
export class BoardAstar_guide extends BoardAstar_opt {
  /** 距离空白权重系数 */
  distWeight = 6;
  /** 边界/focus 增强权重（建议 < distWeight/3） */
  borderWeight = 1.2;

  /** 全局 focus（整轮还原不清空，只增不减） */
  focus = new Set<number>();
  focusDown = new Set<number>();
  focusWeightMap:Set<ActionDir>[][] = [];
  /** 数字 → 相对空白终点的距离归一化 [0,1] */
  private distScale: Record<number, number> = {};

  dbgCost:number[]|undefined = [];

  setGuideParams(distWeight?: number, borderWeight?: number) {
    if (typeof distWeight === "number" && distWeight >= 0) {
      this.distWeight = distWeight;
    }
    if (typeof borderWeight === "number" && borderWeight >= 0) {
      this.borderWeight = borderWeight;
    }
  }

  /** 初始化距离表，并重置 focus 为左上两条边线（不含空格） */
  prepareGuide() {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    const emptyFinish = b.finishMap[empty];
    let maxD = 1;
    this.distScale = {};
    this.focus = new Set();
    this.focusDown = new Set();
    this.focusWeightMap = Array.from({length: h}, () => Array.from({length: w}, () => new Set<ActionDir>()));
    
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
        // 1. 初始化：只加左、上边线，不扩四邻
        if (r === 0 || c === 0){ 
            this.focus.add(tile);
            if(r==0) this.focusWeightMap[r][c].add(ActionDir.u);
            if(c==0) this.focusWeightMap[r][c].add(ActionDir.l);
            // 补充右边界和下边界判断
            if(r===0 && c === w-1) this.focusWeightMap[r][c].add(ActionDir.r);
            if(r === h-1 && c === 0) this.focusWeightMap[r][c].add(ActionDir.d);
            if(this.isFocusDown(tile,b.list)) {
                this.focusDown.add(tile);
                this.addFocusNeighbors(tile,b.list);
            }
        }
      }
    }
  }

  isFocusDown(tile: number,list: number[]): boolean {
    const b = this.board;
    return list[b.finishMap[tile]] === tile
  }

  checkFocusDownIsDown(list: number[]): boolean {
    // return true
    const b = this.board;
    for (const tile of this.focusDown) {
      if (!this.isFocusDown(tile,list)) return false;
    }
    return true;
  }

  /** 添加 focus 相邻格 */
  private addFocusNeighbors(tile: number, list: number[]): boolean {
    const b = this.board;
    const empty = b.emptyNum;
    const info = b.finishNum2Idx[tile];
    if (!info) return false;
    let added = false;
    for (let k = 0; k < info.adjNum.length; k++) {
      const n = info.adjNum[k];
      if (n === empty || this.focus.has(n)) continue;
      this.focus.add(n);
      const idx = info.adjIdx[k];
      const row = Math.floor(idx / b.widthCnt);
      const col = idx % b.widthCnt;
      this.focusWeightMap[row][col].add(b.reverseDir[info.adjDir[k]]);
      //   补充下边界和右边界判断
      if(row === b.heightCnt-1) this.focusWeightMap[row][col].add(ActionDir.d);
      if(col === b.widthCnt-1) this.focusWeightMap[row][col].add(ActionDir.r);
      if(!this.focusDown.has(n) && this.isFocusDown(n,list)) {
        this.focusDown.add(n);
      }
      added = true;
    }
    return added;
  }

  /**
   * 2. 还原中：由本次移动的数字判断——若该数字在 focus 内且已复位，
   * 则检查其终点位上下左右，未在 focus 内的加入。
   * 返回当前点为focus且回位
   */
  growFocus(state: StateOpt, list: number[]): boolean {
    if (!state.beforeState) return false;
    const b = this.board;
    const width = b.widthCnt;
    const emptyAfter = state.emptyIndex;
    let emptyBefore = emptyAfter;
    if (state.action === ActionDir.u) emptyBefore = emptyAfter + width;
    else if (state.action === ActionDir.d) emptyBefore = emptyAfter - width;
    else if (state.action === ActionDir.l) emptyBefore = emptyAfter + 1;
    else if (state.action === ActionDir.r) emptyBefore = emptyAfter - 1;
    else return false;

    const tile = list[emptyBefore];
    // if (tile === b.emptyNum) return;
    if (!this.focus.has(tile)) return false; // 不是focus内的数字 退出
    if (!this.isFocusDown(tile,list)) return false; // focus的数字未还原的话 退出
    this.focusDown.add(tile); // 已还原 标记还原
    return this.addFocusNeighbors(tile, list);
    
  }

  /** 加权曼哈顿：基础 1 + 距离权重 +（focus 时）边界权重 */
  getGuideManhattan(list: number[]): number {
    const b = this.board;
    const empty = b.emptyNum;
    const width = b.widthCnt;
    const dw = this.distWeight;
    const bw = this.borderWeight;
    this.dbgCost && (this.dbgCost = []);
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      const tile = list[i];
      if (tile === empty) continue;
      const origin = b.finishMap[tile];
      const manh =
        Math.abs(Math.floor(i / width) - Math.floor(origin / width)) +
        Math.abs((i % width) - (origin % width));
      const dist = this.distScale[tile] ?? 0;
      let fw = 1 + this.focusWeightMap[Math.floor(i / width)][i % width].size;
      if(fw>2) fw = 2; // 大于2个相邻格时才加成
      // 边界增强权重建议 < 距离权重/3
    //   const w = 1 + dw * dist + (this.focus.has(tile) ? bw : 0);
    //   const w = 1 + dw * dist * (this.focus.has(tile) ? bw : 1);
      const w = 1 + dw * dist*(fw>2 ? fw : 1) * (this.focus.has(tile) ? bw : 1);;
      sum += manh * w;
      this.dbgCost && this.dbgCost.push(manh * w);
    }
    return sum;
  }

  calcGuideValue(gcost: number, list: number[], hcost2 = 0): number {
    return gcost + this.getGuideManhattan(list) + hcost2 / 2;
  }

  applyGuideCost(state: StateOpt, list: number[]) {
    state.cost = this.calcGuideValue(state.gcost, list, state.hcost2);
  }

  /** 其余 open 移入 close，只保留当前节点继续扩；返回被关闭的节点 */
  closeOtherStates(keepKey: string): string[] {
    const closed: string[] = [];
    const keys = Object.keys(this.openSet);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (k === keepKey) continue;
      this.closeSet[k] = this.openSet[k];
      delete this.openSet[k];
      closed.push(k);
    }
    this.openQueue.clear();
    if (this.openSet[keepKey]) this.openQueue.add(keepKey);
    return closed;
  }

  reopenState(key: string): boolean {
    const st = this.closeSet[key];
    if (!st) return false;
    delete this.closeSet[key];
    const list = this.resolveList(key, st);
    this.openAdd(key, st, list);
    return true;
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
