import { BoardAstar_cell } from "../cell/boardAstar_cell";

/**
 * cell group 引导：L 形 focus 按 groupSize 分组，选预估距离和最小的组。
 */
export class BoardAstar_cgroup extends BoardAstar_cell {
  groupSize = 4;
  focusRow = 0;
  focusCol = 0;
  curGroup: number[] = [];
  approachWeight = 0.2;
  goingWeight = 1.05;

  setCgroupParams(
    approachWeight?: number,
    goingWeight?: number,
    groupSize?: number
  ) {
    this.setCellParams(approachWeight, goingWeight);
    if (typeof groupSize === "number" && groupSize >= 1) {
      this.groupSize = groupSize | 0;
    }
  }

  prepareCgroup() {
    this.prepareCell();
    this.focusRow = 0;
    this.focusCol = 0;
    this.curGroup = [];
    this.going = new Set();
    this.rebuildFocus();
  }

  rowDone(list: number[], r: number): boolean {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    if (r < 0 || r >= h) return false;
    for (let c = 0; c < w; c++) {
      const n = b.finishIdx2Num[r * w + c]?.num;
      if (n == null || n === empty) continue;
      if (list[r * w + c] !== n) return false;
    }
    return true;
  }

  colDone(list: number[], c: number): boolean {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    if (c < 0 || c >= w) return false;
    for (let r = 0; r < h; r++) {
      const n = b.finishIdx2Num[r * w + c]?.num;
      if (n == null || n === empty) continue;
      if (list[r * w + c] !== n) return false;
    }
    return true;
  }

  /** 左下→左上→右上：当前列从下到上，再当前行向右 */
  collectFocusTiles(): number[] {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    const out: number[] = [];
    const add = (r: number, c: number) => {
      if (r < 0 || c < 0 || r >= h || c >= w) return;
      const n = b.finishIdx2Num[r * w + c]?.num;
      if (n == null || n === empty) return;
      out.push(n);
    };
    for (let r = h - 1; r >= this.focusRow; r--) add(r, this.focusCol);
    for (let c = this.focusCol + 1; c < w; c++) add(this.focusRow, c);
    return out;
  }

  rebuildFocus() {
    this.focus = new Set(this.collectFocusTiles());
  }

  advanceFocus(list: number[]): boolean {
    const b = this.board;
    const empty = b.emptyNum;
    const h = b.heightCnt;
    const w = b.widthCnt;
    let moved = false;
    while (this.focusRow < h && this.rowDone(list, this.focusRow)) {
      for (let c = 0; c < w; c++) {
        const n = b.finishIdx2Num[this.focusRow * w + c]?.num;
        if (n != null && n !== empty) this.going.add(n);
      }
      this.focusRow += 1;
      moved = true;
    }
    while (this.focusCol < w && this.colDone(list, this.focusCol)) {
      for (let r = 0; r < h; r++) {
        const n = b.finishIdx2Num[r * w + this.focusCol]?.num;
        if (n != null && n !== empty) this.going.add(n);
      }
      this.focusCol += 1;
      moved = true;
    }
    this.rebuildFocus();
    return moved;
  }

  pickGroup(list: number[]): number[] {
    const tiles = this.collectFocusTiles();
    if (!tiles.length) return [];
    const size = Math.max(1, this.groupSize);
    const candidates: number[][] = [];
    for (let i = 0; i < tiles.length; i += size) {
      const g = tiles.slice(i, i + size);
      let unrestored = 0;
      for (let k = 0; k < g.length; k++) {
        if (!this.isTileHome(list, g[k])) unrestored += 1;
      }
      if (!unrestored) {
        for (let k = 0; k < g.length; k++) this.going.add(g[k]);
        continue;
      }
      candidates.push(g);
    }
    if (!candidates.length) return [];
    let best = candidates[0];
    let bestAvg = Infinity;
    for (let i = 0; i < candidates.length; i++) {
      const g = candidates[i];
      let sum = 0;
      let cnt = 0;
      for (let k = 0; k < g.length; k++) {
        if (this.isTileHome(list, g[k])) continue;
        sum += this.estimateDist(list, g[k]);
        cnt += 1;
      }
      const avg = cnt ? sum / cnt : Infinity;
      if (avg < bestAvg) {
        bestAvg = avg;
        best = g;
      }
    }
    return best;
  }

  pickApproachTarget(list: number[], group: number[]): number {
    let best = -1;
    let bestD = Infinity;
    for (let i = 0; i < group.length; i++) {
      if (this.isTileHome(list, group[i])) continue;
      const d = this.emptyToTile(list, group[i]);
      if (d < bestD) {
        bestD = d;
        best = group[i];
      }
    }
    return best;
  }

  isGroupDone(list: number[], group: number[]): boolean {
    for (let i = 0; i < group.length; i++) {
      if (!this.isTileHome(list, group[i])) return false;
    }
    return true;
  }

  getFocusList(stateStr: string) {
    const res = super.getFocusList(stateStr);
    const groupList = Array.from({ length: this.board.heightCnt }, () =>
      Array.from({ length: this.board.widthCnt }, () => 0)
    );
    for (const tile of this.curGroup) {
      const idx = this.board.finishMap[tile];
      const row = Math.floor(idx / this.board.widthCnt);
      const col = idx % this.board.widthCnt;
      groupList[row][col] = 1;
    }
    return { ...res, groupList };
  }

  getCellManhattan(list: number[]): number {
    const b = this.board;
    const empty = b.emptyNum;
    const width = b.widthCnt;
    this.dbgCost && (this.dbgCost = []);
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      const tile = list[i];
      if (tile === empty) {
        this.dbgCost && this.dbgCost.push(0);
        continue;
      }
      const origin = b.finishMap[tile];
      const manh =
        Math.abs(Math.floor(i / width) - Math.floor(origin / width)) +
        Math.abs((i % width) - (origin % width));
    //   const w = this.phase === 2 && this.going.has(tile) ? this.goingWeight : 1;
      const w = this.going.has(tile) ? this.goingWeight : 1;
      sum += manh * w;
      this.dbgCost && this.dbgCost.push(w);
    }
    if (this.phase === 1 && this.targetTile >= 0) {
      sum += this.approachWeight * this.emptyToTile(list, this.targetTile);
    }
    return sum;
  }

  captureGuide() {
    return {
      ...super.captureGuide(),
      focusRow: this.focusRow,
      focusCol: this.focusCol,
      curGroup: this.curGroup,
      groupSize: this.groupSize,
    };
  }

  restoreGuide(s: ReturnType<BoardAstar_cell["captureGuide"]>) {
    super.restoreGuide(s);
    const g = s as ReturnType<BoardAstar_cgroup["captureGuide"]>;
    if (typeof g.focusRow === "number") this.focusRow = g.focusRow;
    if (typeof g.focusCol === "number") this.focusCol = g.focusCol;
    if (g.curGroup) this.curGroup = g.curGroup;
    if (typeof g.groupSize === "number") this.groupSize = g.groupSize;
  }
}
