import { ActionDir } from "../../numBoard";
import { printTable } from "@/js/tool";
import { BoardAstarCell } from "../cell/boardAstarCell";
import { BoardAstar_cgroup } from "./boardAstar_cgroup";

/**
 * cell group 引导入口：继承 cell，无开窗、无双向。
 * L 形 focus 分组还原，going 全局只增。
 */
export class BoardAstarCgroup extends BoardAstarCell {
  astar = new BoardAstar_cgroup();

  get groupSize() {
    return this.astar.groupSize;
  }

  setCgroupParams(
    approachWeight?: number,
    goingWeight?: number,
    groupSize?: number
  ) {
    this.astar.setCgroupParams(approachWeight, goingWeight, groupSize);
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
    this.astar.prepareCgroup();
    this.astar.opposite = null;
    this.astar.meetBound = Infinity;
  }

  consoleLogTable(stateStr: string | undefined, title?: string) {
    if (!stateStr) return;
    const res = this.astar.getFocusList(stateStr);
    printTable(
      ["state", "done", "focus", "going", "group", "dbgCost"],
      [
        res.stateList,
        res.doneList,
        res.focusList,
        res.goingList,
        res.groupList,
        res.dbgCostList,
      ],
      title
    );
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec BoardAstarCgroup");
    const startTimestamp = Date.now();
    let list = this.astar.board.list.concat();
    const allActions: ActionDir[] = [];
    let stateCnt = 0;
    let groupCnt = 0;
    const accState = () => {
      stateCnt +=
        this.astar.openQueue.size() +
        Object.keys(this.astar.closeSet).length +
        this.astar.remoceCnt;
    };

    while (true) {
      // 整盘完成则退出；否则推进 focusRow/Col，按 L 序分组选和最小
      this.astar.board.setList(list, false);
      let same = true;
      for (let i = 0; i < list.length; i++) {
        if (list[i] !== this.astar.board.finishIdx2Num[i]?.num) {
          same = false;
          break;
        }
      }
      if (same) break;

      this.astar.advanceFocus(list);
      let group = this.astar.pickGroup(list);
      while (!group.length) {
        const moved = this.astar.advanceFocus(list);
        group = this.astar.pickGroup(list);
        if (group.length) break;
        if (!moved) throw new Error("cgroup focus 无法继续扩展");
      }

      this.astar.curGroup = group;
      const target = this.astar.pickApproachTarget(list, group);
      this.astar.targetTile = target;
      groupCnt += 1;
      stepCb &&
        stepCb(
          `cgroup ${groupCnt} fr=${this.astar.focusRow} fc=${this.astar.focusCol} group=${group.join(",")}`
        );

      // 阶段1：空格靠近组内 d1 最小格；阶段2：组员加入 going，等 going 全部复位
      this.astar.phase = 1;
      if (target >= 0 && !this.astar.isPhase1Done(list)) {
        const p1 = await this.execPhase(
          list,
          (cur) => this.astar.isPhase1Done(cur),
          `cgroup阶段1(tile=${target})`,
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

      this.astar.phase = 2;
      for (let i = 0; i < group.length; i++) this.astar.going.add(group[i]);
      if (!this.astar.isPhase2Done(list) || !this.astar.isGroupDone(list, group)) {
        const p2 = await this.execPhase(
          list,
          (cur) =>
            this.astar.isPhase2Done(cur) && this.astar.isGroupDone(cur, group),
          `cgroup阶段2(group=${group.join(",")})`,
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

      this.astar.advanceFocus(list);
      console.log(
        `cgroup完成 group=${group.join(",")} +累计${allActions.length}步, fr=${this.astar.focusRow} fc=${this.astar.focusCol}`
      );
      this.consoleLogTable(this.lastStateStr, "cgroup完成");
    }

    const duration = Date.now() - startTimestamp;
    console.log(
      `Done(cgroup):还原路径${allActions.length}步,遍历状态${(
        stateCnt / 10 ** 6
      ).toFixed(3)}M,耗时${(duration / 1000).toFixed(3)}s,千次耗时${
        stateCnt ? ((duration * 1000) / stateCnt).toFixed(3) : 0
      }ms, 组数${groupCnt}\n` +
        `ew: ${this.approachWeight}, gw: ${this.goingWeight}, gs: ${this.groupSize}`
    );
    return allActions;
  }
}
