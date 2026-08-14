import { BoardAstar_opt, StateOpt } from "../opt/boardAstar_opt";

/**
 * cell 引导 A*：只改计分。
 * 阶段1：空格靠近目标数字 *2；阶段2：going 内数字曼哈顿 *4。
 */
export class BoardAstar_cell extends BoardAstar_opt {
  focus = new Set<number>();
  going = new Set<number>();
  targetTile = -1;
  /** 1=空格靠近数字，2=还原数字 */
  phase: 1 | 2 = 1;
  approachWeight = 0.2;
  goingWeight = 1.05;
  dbgCost:number[]|undefined = [];

  setCellParams(approachWeight?: number, goingWeight?: number) {
    if (typeof approachWeight === "number" && approachWeight >= 0) {
      this.approachWeight = approachWeight;
    }
    if (typeof goingWeight === "number" && goingWeight >= 0) {
      this.goingWeight = goingWeight;
    }
  }

  isTileHome(list: number[], tile: number): boolean {
    return list[this.board.finishMap[tile]] === tile;
  }

  prepareCell() {
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    this.focus = new Set();
    this.going = new Set();
    this.targetTile = -1;
    this.phase = 1;
    for (let r = 0; r < h; r++) {
      for (let c = 0; c < w; c++) {
        const idx = r * w + c;
        const tile = b.finishIdx2Num[idx]?.num;
        if (tile == null || tile === empty) continue;
        if (r === 0 || c === 0) {
          this.focus.add(tile);
        }
      }
    }
  }

  getFocusList(stateStr: string): { stateList: number[][], doneList: number[][], 
    focusList: number[][], goingList: number[][], dbgCostList: number[][] } {
    const ll = this.fromKey(stateStr);
    const doneList = Array.from({length: this.board.heightCnt}, () => Array.from({length: this.board.widthCnt}, () => 0));
    const focusList = Array.from({length: this.board.heightCnt}, () => Array.from({length: this.board.widthCnt}, () => 0));
    const goingList = Array.from({length: this.board.heightCnt}, () => Array.from({length: this.board.widthCnt}, () => 0));
    const stateList:number[][] =[];
    const dbgCostList = Array.from({length: this.board.heightCnt}, () => Array.from({length: this.board.widthCnt}, () => 0));
    
    for(let i = 0; i < this.board.heightCnt; i++) {
      stateList.push(ll.slice(i * this.board.widthCnt, (i + 1) * this.board.widthCnt));
    }
    for(let i = 0; i < this.board.heightCnt; i++) {
      for(let j = 0; j < this.board.widthCnt; j++) {
        const idx = i * this.board.widthCnt + j;
        const want = this.board.finishIdx2Num[idx]?.num;
        if (want != null && ll[idx] === want) {
          doneList[i][j] = 1;
        }
      }
    }
    for (const tile of this.focus) {
      const idx = this.board.finishMap[tile];
      const row = Math.floor(idx / this.board.widthCnt);
      const col = idx % this.board.widthCnt;
      focusList[row][col] = 1;
    }
    for (const tile of this.going) {
      const idx = this.board.finishMap[tile];
      const row = Math.floor(idx / this.board.widthCnt);
      const col = idx % this.board.widthCnt;
      goingList[row][col] = 1;
    }
    for(let i = 0; i < this.board.heightCnt; i++) {
      for(let j = 0; j < this.board.widthCnt; j++) {
        dbgCostList[i][j] = this.dbgCost?.[i * this.board.widthCnt + j] ?? 0;
      }
    }
    return { stateList,doneList, focusList, goingList, dbgCostList };
  }

  addFocusNeighbors2(tile: number, list: number[]): boolean {
    const focusSize = this.focus.size;
    const b = this.board;
    const empty = b.emptyNum;
    const w = b.widthCnt;
    const h = b.heightCnt;
    const idx = b.finishMap[tile];
    const row = Math.floor(idx / w);
    const col = idx % w;

    const addAt = (r: number, c: number,set_:Set<number>) => {
      if (r < 0 || c < 0 || r >= h || c >= w) return;
      const n = b.finishIdx2Num[r * w + c]?.num;
      if (n == null || n === empty || set_.has(n)) return;
      set_.add(n);
    };
    const rowDone = (r: number) => {
      if (r < 0 || r >= h) return false;
      for (let c = 0; c < w; c++) {
        const n = b.finishIdx2Num[r * w + c]?.num;
        if (n == null || n === empty) continue;
        if (list[r * w + c] !== n) return false;
      }
      return true;
    };
    const colDone = (c: number) => {
      if (c < 0 || c >= w) return false;
      for (let r = 0; r < h; r++) {
        const n = b.finishIdx2Num[r * w + c]?.num;
        if (n == null || n === empty) continue;
        if (list[r * w + c] !== n) return false;
      }
      return true;
    };

    if (rowDone(row) && (row === 0 || rowDone(row - 1))) {
      const r1 = row + 1;
      if (r1 < h) {
        for (let c = 0; c < w; c++){
          addAt(row, c,this.going) // 当前行加入 going
          addAt(r1, c,this.focus) // 下一行加入 focus
        };
      }
    }
    if (colDone(col) && (col === 0 || colDone(col - 1))) {
      const c1 = col + 1;
      if (c1 < w) {
        for (let r = 0; r < h; r++){
          addAt(r, col,this.going) // 当前列加入 going
          addAt(r, c1,this.focus); // 下一列加入 focus
        };
      }
    }
    return focusSize !== this.focus.size;
  }

  /** d1 + 3*d2 + 5*d3 */
  estimateDist(list: number[], tile: number): number {
    const b = this.board;
    const w = b.widthCnt;
    let emptyPos = 0;
    let cur = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === b.emptyNum) emptyPos = i;
      if (list[i] === tile) cur = i;
    }
    const dest = b.finishMap[tile];
    const d1 = b.manhattan(emptyPos, cur);
    const dx = Math.abs((cur % w) - (dest % w));
    const dy = Math.abs(Math.floor(cur / w) - Math.floor(dest / w));
    const d2 = Math.min(dx, dy);
    const d3 = Math.abs(dx - dy);
    return d1 + 3 * d2 + 5 * d3;
  }

  pickTarget(list: number[]): number {
    const empty = this.board.emptyNum;
    let best = -1;
    let bestD = Infinity;
    for (const tile of this.focus) {
      if (tile === empty || this.isTileHome(list, tile)) continue;
      const d = this.estimateDist(list, tile);
      if (d < bestD) {
        bestD = d;
        best = tile;
      }
    }
    return best;
  }

  emptyToTile(list: number[], tile: number): number {
    const b = this.board;
    let emptyPos = 0;
    let cur = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === b.emptyNum) emptyPos = i;
      if (list[i] === tile) cur = i;
    }
    return b.manhattan(emptyPos, cur);
  }

  isPhase1Done(list: number[]): boolean {
    return this.emptyToTile(list, this.targetTile) <= 1;
  }

  isPhase2Done(list: number[]): boolean {
    if (!this.going.size) return this.isTileHome(list, this.targetTile);
    for (const tile of this.going) {
      if (!this.isTileHome(list, tile)) return false;
    }
    return true;
  }

  getCellManhattan(list: number[]): number {
    const b = this.board;
    const empty = b.emptyNum;
    const width = b.widthCnt;
    this.dbgCost && (this.dbgCost = []);
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      const tile = list[i];
      if (tile === empty) continue;
      const origin = b.finishMap[tile];
      const manh =
        Math.abs(Math.floor(i / width) - Math.floor(origin / width)) +
        Math.abs((i % width) - (origin % width));
    //   const w = this.phase === 2 && this.going.has(tile) ? this.goingWeight : 1;
      const w = this.goingWeight ; // 避免阶段1时被拆掉
      sum += manh * w;
      this.dbgCost && this.dbgCost.push( w);
    }
    if (this.phase === 1 && this.targetTile >= 0) {
      sum += this.approachWeight * this.emptyToTile(list, this.targetTile);
    }
    return sum;
  }

  captureGuide() {
    return {
      focus: this.focus,
      going: this.going,
      targetTile: this.targetTile,
      phase: this.phase,
    };
  }

  restoreGuide(s: ReturnType<BoardAstar_cell["captureGuide"]>) {
    this.focus = s.focus;
    this.going = s.going;
    this.targetTile = s.targetTile;
    this.phase = s.phase;
  }

  applyCellCost(state: StateOpt, list: number[]) {
    state.cost = state.gcost + this.getCellManhattan(list) + state.hcost2 / 2;
  }

  openAdd(stateStr: string, state: StateOpt, listForF2f?: number[]) {
    const list = listForF2f || state.list || this.fromKey(stateStr);
    this.applyCellCost(state, list);
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
