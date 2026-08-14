import { ActionDir } from "../../numBoard";
import { BoardAstar_cell } from "./boardAstar_cell";
import { printTable } from "@/js/tool";

/**
 * cell 引导入口：单向 A*，无开窗、无双向。
 * 每轮选 focus 中预估最近的格，先空格靠近再还原。
 */
export class BoardAstarCell {
  astar = new BoardAstar_cell();
  lastStateStr: string | undefined;

  get approachWeight() {
    return this.astar.approachWeight;
  }
  get goingWeight() {
    return this.astar.goingWeight;
  }

  setCellParams(approachWeight?: number, goingWeight?: number) {
    this.astar.setCellParams(approachWeight, goingWeight);
  }

  init(widthCnt: number, heightCnt: number, list: number[]) {
    this.astar.setFlags({
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    });
    this.astar.init(widthCnt, heightCnt, list);
    this.astar.prepareCell();
    this.astar.opposite = null;
    this.astar.meetBound = Infinity;
  }

  clear() {
    this.astar.clear();
  }

  consoleLogTable(stateStr: string|undefined,title?:string) {
    if (!stateStr) return;
    const res = this.astar.getFocusList(stateStr);
    printTable(
        ["state","done", "focus", "going", "dbgCost"], 
        [res.stateList, res.doneList, res.focusList, res.goingList, res.dbgCostList], 
        title
    );
  }

  protected applyActions(list: number[], actions: ActionDir[]): number[] {
    const b = this.astar.board;
    b.setList(list, false);
    for (let i = 0; i < actions.length; i++) {
      b.doAction(actions[i], true);
    }
    return b.list.concat();
  }

  protected async execPhase(
    list: number[],
    done: (cur: number[]) => boolean,
    tag: string,
    stepCb?: (str: string) => void
  ): Promise<ActionDir[]> {
    const side = this.astar;
    const saved = side.captureGuide();
    side.clear();
    side.setFlags({
      usePdb: false,
      useCompact: true,
      useNoList: true,
      useFrontToFront: false,
      useMmPriority: false,
    });
    side.init(side.board.widthCnt, side.board.heightCnt, list);
    side.restoreGuide(saved);
    if (done(list)) return [];

    side.execInit();
    if (done(side.board.list)) return [];

    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined;
    const gen = side.execStep();
    for (;;) {
      const { value: stateStr, done: genDone } = gen.next();
      this.lastStateStr = stateStr || undefined;
      if (genDone) throw new Error("cell 还原失败");
      cnt += 1;
      const st = side.getState(stateStr);
      if (!st) continue;
      const cur = side.resolveList(stateStr, st);
      if (done(cur)) {
        finishStr = stateStr;
        break;
      }
      const now = Date.now();
      const duration = now - startTimestamp;
      if (now - logTimestamp > 500) {
        logTimestamp = now;
        const s = `${tag} 已遍历${cnt / 1000000}M,耗时${(duration / 1000).toFixed(
          3
        )}s,千次耗时${((duration * 1000) / cnt).toFixed(3)}ms...`;
        console.log(s);


        if(Math.floor( logTimestamp/500)%8==0 ) this.consoleLogTable(this.lastStateStr,'time');
        stepCb && stepCb(s);
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
      removeRunCnt += 1;
      if (removeRunCnt > 1000000) {
        side.removeTest();
        removeRunCnt = 0;
      }
    }
    if (!finishStr) throw new Error("cell 还原失败");
    return side.getPath(finishStr);
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardAstarCell");
    const startTimestamp = Date.now();
    let list = this.astar.board.list.concat();
    const allActions: ActionDir[] = [];
    let stateCnt = 0;
    let cellCnt = 0;
    const accState = () => {
      stateCnt +=
        this.astar.openQueue.size() +
        Object.keys(this.astar.closeSet).length +
        this.astar.remoceCnt;
    };

    while (true) {
      // 整盘完成则退出；否则从 focus 选预估最近格
      this.astar.board.setList(list, false);
      let same = true;
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== this.astar.board.finishIdx2Num[i]?.num) {
          same = false;
          break;
        }
      }
      if (same) break;

      // 从 focus 选预估最近格
      let target = this.astar.pickTarget(list);
      while (target < 0) {
        let grew = false;
        for (const t of Array.from(this.astar.focus)) {
          if (this.astar.isTileHome(list, t) && this.astar.addFocusNeighbors2(t, list)) {
            grew = true;
          }
        }
        target = this.astar.pickTarget(list);
        if (target >= 0) break;
        if (!grew) throw new Error("cell focus 无法继续扩展");
      }

      this.astar.targetTile = target;
      cellCnt += 1;
      stepCb && stepCb(`cell ${cellCnt} tile=${target} focus=${this.astar.focus.size}`);

      // 阶段1：空格靠近目标；阶段2：还原并等待 going 全部复位，再扩 focus
      this.astar.phase = 1;
      if (!this.astar.isPhase1Done(list)) {
        const p1 = await this.execPhase(
          list,
          (cur) => this.astar.isPhase1Done(cur),
          `cell阶段1(tile=${target})`,
          stepCb
        );
        accState();
        if (p1.length) {
          const merged = this.astar.board.actoinsConcat(allActions, p1);
          allActions.length = 0;
          allActions.push(...merged);
          list = this.applyActions(list, p1);
        }
      }

      // 阶段2：还原并等待 going 全部复位，再扩 focus
      this.astar.phase = 2;
      this.astar.going.add(target);
      if (!this.astar.isPhase2Done(list)) {
        const p2 = await this.execPhase(
          list,
          (cur) => this.astar.isPhase2Done(cur),
          `cell阶段2(tile=${target})`,
          stepCb
        );
        accState();
        if (p2.length) {
          const merged = this.astar.board.actoinsConcat(allActions, p2);
          allActions.length = 0;
          allActions.push(...merged);
          list = this.applyActions(list, p2);
        }
      }

      this.astar.addFocusNeighbors2(target, list);
      console.log(
        `cell完成 tile=${target} +累计${allActions.length}步, focus=${this.astar.focus.size}`
      );
      this.consoleLogTable(this.lastStateStr,'cell完成');
    }

    const duration = Date.now() - startTimestamp;
    console.log(
      `Done(cell):还原路径${allActions.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,耗时${(duration / 1000).toFixed(3)}s,千次耗时${
        stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0
      }ms, 格数${cellCnt}\n`+
      `ew: ${this.approachWeight}, gw: ${this.goingWeight}`
    );
    return allActions;
  }
}
