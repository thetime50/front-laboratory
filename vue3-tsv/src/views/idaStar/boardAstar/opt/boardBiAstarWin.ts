import { ActionDir } from "../../numBoard";
import { BoardBiAstar } from "../boardBiAstar";
import { BoardAstar_win, WinRect } from "./boardAstar_win";

/**
 * 开窗双向 A* 入口（结构参考 BoardBiAstarOpt）。
 * 去掉 PDB / Meet / MM / F2F 等启发优化；保留 compact / noList 工程优化。
 * 按开窗区域分阶段还原，每完成一窗推进到下一窗并刷新开窗价值排序。
 */
export class BoardBiAstarWin extends BoardBiAstar {
  astar = new BoardAstar_win() as any;
  rAstar = new BoardAstar_win() as any;

  winW = 3;
  winH = 1;
  winWeight = 4;

  private get fAstar(): BoardAstar_win {
    return this.astar as unknown as BoardAstar_win;
  }
  private get fRAstar(): BoardAstar_win {
    return this.rAstar as unknown as BoardAstar_win;
  }

  setWinParams(winW: number, winH: number, winWeight?: number) {
    this.winW = Math.max(1, winW | 0);
    this.winH = Math.max(1, winH | 0);
    if (typeof winWeight === "number" && winWeight > 0) {
      this.winWeight = winWeight;
    }
    this.fAstar.setWinSize(this.winW, this.winH, this.winWeight);
    this.fRAstar.setWinSize(this.winW, this.winH, this.winWeight);
  }

  init(widthCnt: number, heightCnt: number, list: number[]) {
    // 去除启发优化；保留编码相关开关
    const baseFlags = {
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    };
    this.fAstar.setFlags(baseFlags);
    this.fRAstar.setFlags(baseFlags);
    this.fAstar.setWinSize(this.winW, this.winH, this.winWeight);
    this.fRAstar.setWinSize(this.winW, this.winH, this.winWeight);
    this.fAstar.init(widthCnt, heightCnt, list);
    this.fRAstar.init(widthCnt, heightCnt);
    this.fRAstar.setFinishList(list);
    this.fAstar.opposite = null;
    this.fRAstar.opposite = null;
  }

  clear() {
    this.fAstar.clear();
    this.fRAstar.clear();
  }

  /** 生成开窗序列：宽高独立步进，贴边时对齐右/下边界 */
  buildWindows(boardW: number, boardH: number): WinRect[] {
    const winW = Math.min(this.winW, boardW);
    const winH = Math.min(this.winH, boardH);
    const out: WinRect[] = [];
    const seen = new Set<string>();
    for (let t0 = 0; t0 < boardH; t0 += winH) {
      for (let l0 = 0; l0 < boardW; l0 += winW) {
        const left = l0 + winW > boardW ? Math.max(0, boardW - winW) : l0;
        const top = t0 + winH > boardH ? Math.max(0, boardH - winH) : t0;
        const key = `${left},${top},${winW},${winH}`;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ left, top, w: winW, h: winH });
      }
    }
    return out;
  }

  private applyActions(list: number[], actions: ActionDir[]): number[] {
    const b = this.fAstar.board;
    b.setList(list, false);
    for (let i = 0; i < actions.length; i++) {
      b.doAction(actions[i], true);
    }
    return b.list.concat();
  }

  /** 单阶段：单向开窗 A*，直到 focus 数字归位 */
  private async execWindowPhase(
    list: number[],
    rect: WinRect,
    focusNums: Set<number>,
    stepCb?: (str: string) => void
  ): Promise<ActionDir[]> {
    const side = this.fAstar;
    side.clear();
    side.setFlags({
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    });
    side.setWinSize(this.winW, this.winH, this.winWeight);
    side.init(side.board.widthCnt, side.board.heightCnt, list);
    side.setWindow(rect, focusNums);

    if (side.isFocusDone(list)) {
      return [];
    }

    side.execInit();
    // 按当前开窗价值重建排序（切换开窗后刷新）
    side.refreshWinOrder();
    if (side.isFocusDone()) {
      return [];
    }

    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined;

    const gen = side.execStep();
    for (;;) {
      const { value: stateStr, done } = gen.next();
      if (done) {
        throw new Error("开窗还原失败");
      }
      cnt += 1;
      const st = side.getState(stateStr);
      if (!st) continue;
      const cur = side.resolveList(stateStr, st);
      if (side.isFocusDone(cur)) {
        finishStr = stateStr;
        break;
      }

      const now = Date.now();
      const duration = now - startTimestamp;
      if (now - logTimestamp > 500) {
        logTimestamp = now;
        const s = `开窗(${rect.left},${rect.top},${rect.w}x${rect.h}) 已遍历${
          cnt / 1000000
        }M,耗时${(duration / 1000).toFixed(3)}s,千次耗时${(
          (duration * 1000) /
          cnt
        ).toFixed(3)}ms...`;
        console.log(s);
        stepCb && stepCb(s);
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      removeRunCnt += 1;
      if (removeRunCnt > 1000000) {
        side.removeTest();
        removeRunCnt = 0;
      }
    }

    if (!finishStr) {
      throw new Error("开窗还原失败");
    }
    return side.getPath(finishStr);
  }

  /** 最后一阶段：经典双向 A*（无 PDB/Meet/MM/F2F），收尾整盘 */
  private async execBiFinish(
    list: number[],
    stepCb?: (str: string) => void
  ): Promise<ActionDir[]> {
    this.fAstar.clear();
    this.fRAstar.clear();
    const flags = {
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    };
    this.fAstar.setFlags(flags);
    this.fRAstar.setFlags(flags);
    this.fAstar.init(this.fAstar.board.widthCnt, this.fAstar.board.heightCnt, list);
    this.fRAstar.init(this.fRAstar.board.widthCnt, this.fRAstar.board.heightCnt);
    this.fRAstar.setFinishList(list);
    // 全盘 focus：权重=1 等价普通启发
    const all = new Set<number>();
    const finish = this.fAstar.board.finishStr.split(",").map((v) => Number(v));
    for (let i = 0; i < finish.length; i++) {
      if (finish[i] !== this.fAstar.board.emptyNum) all.add(finish[i]);
    }
    const full: WinRect = {
      left: 0,
      top: 0,
      w: this.fAstar.board.widthCnt,
      h: this.fAstar.board.heightCnt,
    };
    this.fAstar.winWeight = 1;
    this.fRAstar.winWeight = 1;
    this.fAstar.setWindow(full, all);
    this.fRAstar.setWindow(full, all);

    this.fAstar.meetBound = Infinity;
    this.fRAstar.meetBound = Infinity;
    this.fAstar.execInit();
    this.fRAstar.execInit();

    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined;

    const bGen = this.fAstar.execStep();
    const rbGen = this.fRAstar.execStep();

    const tryMeet = (
      stateStr: string,
      side: BoardAstar_win,
      other: BoardAstar_win
    ) => {
      if (stateStr === side.finishKey || other.haveState(stateStr)) {
        finishStr = stateStr;
      }
    };

    const genNext = (
      gen: Generator<string, void, unknown>,
      side: BoardAstar_win,
      other: BoardAstar_win
    ) => {
      const { value: stateStr, done } = gen.next();
      if (done) {
        throw new Error("还原失败");
      }
      tryMeet(stateStr, side, other);
      cnt += 1;
    };

    if (this.fAstar.startKey === this.fAstar.finishKey) {
      finishStr = this.fAstar.startKey;
    } else {
      for (; !finishStr; ) {
        genNext(bGen, this.fAstar, this.fRAstar);
        if (finishStr) break;
        genNext(rbGen, this.fRAstar, this.fAstar);
        if (finishStr) break;

        const now = Date.now();
        const duration = now - startTimestamp;
        if (now - logTimestamp > 500) {
          logTimestamp = now;
          const s = `收尾双向 已遍历${cnt / 1000000}M,耗时${(
            duration / 1000
          ).toFixed(3)}s,千次耗时${((duration * 1000) / cnt).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        removeRunCnt += 1;
        if (removeRunCnt > 1000000) {
          this.removeTest();
          removeRunCnt = 0;
        }
      }
    }

    if (!finishStr) {
      throw new Error("还原失败");
    }
    return this.getPath(finishStr);
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardBiAstarWin");
    const startTimestamp = Date.now();
    const boardW = this.fAstar.board.widthCnt;
    const boardH = this.fAstar.board.heightCnt;
    let list = this.fAstar.board.list.concat();
    const windows = this.buildWindows(boardW, boardH);
    const focusNums = new Set<number>();
    const allActions: ActionDir[] = [];
    let stateCnt = 0;
    const accState = () => {
      stateCnt +=
        this.fAstar.openQueue.size() +
        Object.keys(this.fAstar.closeSet).length +
        this.fRAstar.openQueue.size() +
        Object.keys(this.fRAstar.closeSet).length +
        this.fAstar.remoceCnt +
        this.fRAstar.remoceCnt;
    };

    for (let i = 0; i < windows.length; i++) {
      const rect = windows[i];
      const winNums = this.fAstar.collectWindowNums(
        rect.left,
        rect.top,
        rect.w,
        rect.h
      );
      winNums.forEach((n) => focusNums.add(n));

      // 挂到引擎上便于 isFocusDone 使用同一 finishMap
      this.fAstar.init(boardW, boardH, list);
      this.fAstar.setWindow(rect, focusNums);

      if (this.fAstar.isFocusDone(list)) {
        console.log(
          `开窗跳过(${rect.left},${rect.top},${rect.w}x${rect.h}) 已归位`
        );
        continue;
      }

      stepCb &&
        stepCb(
          `开窗 ${i + 1}/${windows.length} (${rect.left},${rect.top},${rect.w}x${
            rect.h
          }) focus=${focusNums.size}`
        );

      const path = await this.execWindowPhase(list, rect, focusNums, stepCb);
      accState();
      if (path.length) {
        allActions.push(...path);
        list = this.applyActions(list, path);
      }
      // 下一窗会重新 setWindow + execInit，开窗价值与排序随之刷新
      console.log(
        `开窗完成(${rect.left},${rect.top},${rect.w}x${rect.h}) +${path.length}步, 累计${allActions.length}步`
      );
    }

    this.fAstar.init(boardW, boardH, list);
    if (this.fAstar.startKey !== this.fAstar.finishKey) {
      stepCb && stepCb("开窗收尾双向搜索...");
      const tail = await this.execBiFinish(list, stepCb);
      accState();
      allActions.push(...tail);
      list = this.applyActions(list, tail);
    }

    const duration = Date.now() - startTimestamp;
    console.log(
      `Done(开窗):还原路径${allActions.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,耗时${(duration / 1000).toFixed(3)}s,千次耗时${
        stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0
      }ms, 窗数${windows.length}`
    );
    return allActions;
  }

  getPath(stateStr: string) {
    const actions = this.fAstar.getPath(stateStr);
    let rActions = this.fRAstar.getPath(stateStr);
    rActions = rActions.reverse().map((v) => {
      const m = this.fRAstar.board.reverseDir;
      return m[v];
    });
    console.log(
      this.fRAstar.board.actoins2Str(actions),
      this.fRAstar.board.actoins2Str(rActions)
    );
    return actions.concat(rActions);
  }

  removeTest() {
    this.fAstar.removeTest();
    this.fRAstar.removeTest();
  }
}
