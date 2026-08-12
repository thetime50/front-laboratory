import { ActionDir } from "../../numBoard";
import { BoardAstar_guide } from "./boardAstar_guide";

/**
 * 加权引导求解入口：单向 A*，无开窗、无双向。
 * 计分细节在 BoardAstar_guide。
 */
export class BoardAstarGuide {
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
    console.log("exec BoardAstarGuide");
    const startTimestamp = Date.now();
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined;

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
