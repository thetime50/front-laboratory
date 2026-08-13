import { ActionDir } from "../../numBoard";
import { BoardAstar_guide } from "./boardAstar_guide";

/**
 * 加权引导求解入口：单向 A*，无开窗、无双向。
 * 计分细节在 BoardAstar_guide。
 */
export class BoardAstarGuideClose {
  astar = new BoardAstar_guide();

  distWeight = 4;
  /** 建议 < distWeight/3 */
  borderWeight = 2;

  setGuideParams(distWeight?: number, borderWeight?: number) {
    if (typeof distWeight === "number" && distWeight >= 0) {
      this.distWeight = distWeight;
    }
    if (typeof borderWeight === "number" && borderWeight >= 0) {
      this.borderWeight = borderWeight;
    }
    this.astar.setGuideParams(this.distWeight, this.borderWeight);
  }

  init(widthCnt: number, heightCnt: number, list: number[]) {
    this.astar.setFlags({
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    });
    this.astar.setGuideParams(this.distWeight, this.borderWeight);
    this.astar.init(widthCnt, heightCnt, list);
    this.astar.prepareGuide();
    this.astar.opposite = null;
    this.astar.meetBound = Infinity;
  }

  clear() {
    this.astar.clear();
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardAstarGuideClose");
    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined;

    // console.log("start focus", Array.from(this.astar.focus).join(','));
    this.astar.execInit();

    if (this.astar.startKey === this.astar.finishKey) {
      finishStr = this.astar.startKey;
    } else {
      const gen = this.astar.execStep();
      for (;;) {
        const { value: stateStr, done } = gen.next();
        if (done) throw new Error("还原失败");
        cnt += 1;
        if (stateStr === this.astar.finishKey) {
          finishStr = stateStr;
          break;
        }
        const st = this.astar.openSet[stateStr];
        if (st) {
          const list = this.astar.resolveList(stateStr, st);
          if (this.astar.growFocus(st, list) && this.astar.checkFocusDownIsDown(list)) {
            const _astar = this.astar
            const tile = list[_astar.board.emptyNum];
            const focusArr = Array.from(_astar.focus);
            const fucusDownStr = Array.from( _astar.focusDown).join(',')
            const listStr = list.map((n, i) => (i > 0 && i % _astar.board.widthCnt === 0 ? "\n" : "") + n).join(',');
            const dbgCostStr = !_astar.dbgCost? '': `dbgCost: \n${_astar.dbgCost.map((n, i) => (i > 0 && i % _astar.board.widthCnt === 0 ? "\n" : "") + n.toFixed(2)).join(',')}`;

            console.log(`growFocus tile: ${tile} openSet: ${Object.keys(this.astar.openSet).length} focus: ${this.astar.focus.size
                } \nfocusArr: ${focusArr.join(',')} \nfucusDownStr: ${fucusDownStr} \n${listStr} ${dbgCostStr}`)


            this.astar.keepOnlyOpen(stateStr);
          }
        }
        const now = Date.now();
        const duration = now - startTimestamp;
        if (now - logTimestamp > 500) {
          logTimestamp = now;
          const s = `引导A* 已遍历${cnt / 1000000}M,耗时${(
            duration / 1000
          ).toFixed(3)}s,千次耗时${((duration * 1000) / cnt).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        removeRunCnt += 1;
        if (removeRunCnt > 1000000) {
          this.astar.removeTest();
          removeRunCnt = 0;
        }
      }
    }

    if (!finishStr) throw new Error("还原失败");
    const path = this.astar.getPath(finishStr);
    const duration = Date.now() - startTimestamp;
    const stateCnt =
      this.astar.openQueue.size() +
      Object.keys(this.astar.closeSet).length +
      this.astar.remoceCnt;
    console.log(
      `Done(引导):还原路径${path.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,清理内存${this.astar.remoceCnt}条,耗时${(duration / 1000).toFixed(
        3
      )}s,千次耗时${stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0}ms`
    );
    return path as ActionDir[];
  }
}


export class BoardAstarGuideClear extends BoardAstarGuideClose {
  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardAstarGuideClear");
    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let allActions: ActionDir[] = [];
    let stateCnt = 0;
    let remoceCnt = 0;
    const accState = () => {
      stateCnt +=
        this.astar.openQueue.size() +
        Object.keys(this.astar.closeSet).length +
        this.astar.remoceCnt;
      remoceCnt += this.astar.remoceCnt;
    };

    this.astar.prepareGuide();
    // console.log("start focus", Array.from(this.astar.focus).join(','));
    while (this.astar.startKey !== this.astar.finishKey) {
      this.astar.execInit();
      const gen = this.astar.execStep();
      let finishStr: string | undefined;
      for (;;) {
        const { value: stateStr, done } = gen.next();
        if (done) throw new Error("还原失败");
        cnt += 1;
        const st = this.astar.getState(stateStr);
        if (!st) continue;
        const list = this.astar.resolveList(stateStr, st);
        const genDone = stateStr === this.astar.finishKey ||
          this.astar.growFocus(st,list) && this.astar.checkFocusDownIsDown(list)
          // 清空从来会有循环的情况 用checkFocusDownIsDown避免循环，但是任意一个不归为都会变成false

        if(genDone || this.astar.openQueue.size() === 1) {
          const tile = list[this.astar.board.emptyNum];
          const focusArr = Array.from(this.astar.focus);
          const fucusDownStr = Array.from( this.astar.focusDown).join(',')
          const listStr = list.map((n, i) => (i > 0 && i % 6 === 0 ? "\n" : "") + n).join(',');
          console.log(`growFocus tile: ${tile} openSet: ${Object.keys(this.astar.openSet).length} focus: ${this.astar.focus.size
            } \nfocusArr: ${focusArr.join(',')} \nfucusDownStr: ${fucusDownStr} \n${listStr}`)
        }
        if (genDone) {

          finishStr = stateStr;
          break;
        }
        const now = Date.now();
        const duration = now - startTimestamp;
        if (now - logTimestamp > 500) {
          logTimestamp = now;
          const s = `引导A* 已遍历${cnt / 1000000}M,耗时${(
            duration / 1000
          ).toFixed(3)}s,千次耗时${((duration * 1000) / cnt).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
          await new Promise((resolve) => setTimeout(resolve, 0));
        }
        removeRunCnt += 1;
        if (removeRunCnt > 1000000) {
          this.astar.removeTest();
          removeRunCnt = 0;
        }
      }
      if (!finishStr) throw new Error("还原失败");
      const path = this.astar.getPath(finishStr) as ActionDir[];
      accState();
      allActions = this.astar.board.actoinsConcat(allActions, path);
      const list = this.astar.fromKey(finishStr);
      this.astar.clear();
      this.astar.board.setList(list);
    }

    const duration = Date.now() - startTimestamp;
    console.log(
      `Done(引导):还原路径${allActions.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,清理内存${remoceCnt}条,耗时${(duration / 1000).toFixed(
        3
      )}s,千次耗时${stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0}ms`
    );
    return allActions;
  }
}

export const BoardAstarGuide = BoardAstarGuideClose;
// export const BoardAstarGuide = BoardAstarGuideClear;