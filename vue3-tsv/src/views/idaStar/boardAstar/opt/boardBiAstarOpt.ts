import { BoardBiAstar } from "../boardBiAstar";
import { BoardAstar_opt } from "./boardAstar_opt";
import type { BoardCode } from "./boardCode";
import {
  encodeBoard,
  decodeBoard,
  boardEncodeToStr,
  boardEncodeFromStr,
} from "./boardCode";

/**
 * 优化开关：改 true/false 开启/关闭（也可用注释切换）
 *
 * 1. USE_PDB            Pattern Database 按子图案预计算真实最短
 * 2. USE_MEET_BOUND     Meet 上界剪枝（相遇后继续并剪 f>=U）
 * 3. USE_MM             MM / Near-MM（按优先选边扩展 + MM 优先值）
 * 6. USE_FRONT_TO_FRONT Front-to-Front 启发（对侧前沿曼哈顿）
 * 4. USE_COMPACT        紧凑编码替换字符串 key
 * 5. USE_NO_LIST        不存 list，只存 parent+action（展开时还原）
 */
export const BiAstarOptFlags = {
  // —— 1. Pattern Database ——
  USE_PDB: true,
//   USE_PDB: false,

  // —— 2. Meet 上界剪枝 ——
  USE_MEET_BOUND: true,
//   USE_MEET_BOUND: false,

  // —— 3. MM / Near-MM ——
  USE_MM: true,
//   USE_MM: false,

  // —— 6. Front-to-Front 启发 ——
//   USE_FRONT_TO_FRONT: true,
  USE_FRONT_TO_FRONT: false,

  // —— 4. 紧凑编码（任意长度 Uint8Array）——
  USE_COMPACT: true,
//   USE_COMPACT: false,

  // —— 5. 不存 list ——
  USE_NO_LIST: true,
//   USE_NO_LIST: false,
};

/**
 * 继承 BoardBiAstar 的优化双向 A*
 * init / clear / exec / getPath / removeTest 签名与父类一致
 */
export class BoardBiAstarOpt extends BoardBiAstar {
  // 覆盖为优化引擎（结构仍为双向两套搜索）
  astar = new BoardAstar_opt() as any;
  rAstar = new BoardAstar_opt() as any;

  private get fAstar(): BoardAstar_opt {
    return this.astar as unknown as BoardAstar_opt;
  }
  private get fRAstar(): BoardAstar_opt {
    return this.rAstar as unknown as BoardAstar_opt;
  }

  // ---------- board 编码 <-> 字符串 ----------
  encodeBoard(list: number[]): BoardCode {
    return encodeBoard(list);
  }
  decodeBoard(code: BoardCode): number[] {
    return decodeBoard(code);
  }
  /** board 编码转字符串（可作状态 key，任意尺寸） */
  boardEncodeToStr(code: BoardCode | number[]): string {
    return boardEncodeToStr(code);
  }
  /** 字符串转 board 编码 */
  boardEncodeFromStr(str: string): BoardCode {
    return boardEncodeFromStr(str);
  }

  init(widthCnt: number, heightCnt: number, list: number[]) {
    const flags = BiAstarOptFlags;
    this.fAstar.setFlags({
      usePdb: flags.USE_PDB,
      useCompact: flags.USE_COMPACT,
      useNoList: flags.USE_NO_LIST,
      useFrontToFront: flags.USE_FRONT_TO_FRONT,
      useMmPriority: flags.USE_MM,
    });
    this.fRAstar.setFlags({
      usePdb: flags.USE_PDB,
      useCompact: flags.USE_COMPACT,
      useNoList: flags.USE_NO_LIST,
      useFrontToFront: flags.USE_FRONT_TO_FRONT,
      useMmPriority: flags.USE_MM,
    });
    this.fAstar.init(widthCnt, heightCnt, list);
    this.fRAstar.init(widthCnt, heightCnt);
    this.fRAstar.setFinishList(list);
    // Front-to-Front：互相挂对侧前沿
    this.fAstar.opposite = this.fRAstar;
    this.fRAstar.opposite = this.fAstar;
  }

  clear() {
    this.fAstar.clear();
    this.fRAstar.clear();
  }

  async exec(stepCb?: (str: string) => void) {
    console.log("exec");
    const startTimestamp = Date.now();
    let endTimestamp = 0;
    let logTimestamp = startTimestamp;
    let removeRunCnt = 0;
    let cnt = 0;
    let finishStr: string | undefined = undefined;

    const flags = BiAstarOptFlags;
    const useMeet = flags.USE_MEET_BOUND;
    const useMm = flags.USE_MM;

    this.fAstar.meetBound = Infinity;
    this.fRAstar.meetBound = Infinity;
    this.fAstar.execInit();
    this.fRAstar.execInit();

    const bGen = this.fAstar.execStep();
    const rbGen = this.fRAstar.execStep();

    let meetU = Infinity;
    let expandForward = true;

    const tryMeet = (
      stateStr: string,
      side: BoardAstar_opt,
      other: BoardAstar_opt
    ) => {
      const st = side.getState(stateStr);
      const ot = other.getState(stateStr);
      if (!st) return;
      // 到达本侧目标
      if (stateStr === side.finishKey) {
        const pathLen = st.gcost;
        if (pathLen < meetU) {
          meetU = pathLen;
          finishStr = stateStr;
          if (useMeet) {
            side.meetBound = meetU;
            other.meetBound = meetU;
          }
        }
        if (!useMeet && !useMm) {
          finishStr = stateStr;
        }
        return;
      }
      if (ot) {
        const u = st.gcost + ot.gcost;
        if (u < meetU) {
          meetU = u;
          finishStr = stateStr;
          if (useMeet) {
            side.meetBound = meetU;
            other.meetBound = meetU;
          }
        }
        if (!useMeet && !useMm) {
          finishStr = stateStr;
        }
      }
    };

    const genNext = (gen: Generator<string, void, unknown>, side: BoardAstar_opt, other: BoardAstar_opt) => {
      const { value: stateStr, done } = gen.next();
      if (done) {
        return false;
      }
      tryMeet(stateStr, side, other);
      cnt += 1;
      return true;
    };

    const startKey = this.fAstar.startKey;
    if (startKey === this.fAstar.finishKey) {
      finishStr = startKey;
    } else {
      // 经典模式：首次相遇即停；Meet/MM：更新上界后直至两边 min f >= U
      for (;;) {
        if (!useMeet && !useMm && finishStr) break;

        if (useMeet || useMm) {
          const minF = this.fAstar.minOpenCost();
          const minB = this.fRAstar.minOpenCost();
          if (
            meetU < Infinity &&
            minF >= meetU &&
            minB >= meetU
          ) {
            break;
          }
          if (!this.fAstar.openQueue.size() && !this.fRAstar.openQueue.size()) {
            break;
          }
        }

        let progressed = false;
        if (useMm) {
          const minF = this.fAstar.minOpenCost();
          const minB = this.fRAstar.minOpenCost();
          const sizeF = this.fAstar.openQueue.size();
          const sizeB = this.fRAstar.openQueue.size();
          // Near-MM：优先扩展优先值更小的一边；相等时扩 open 更小的一边
          if (sizeF === 0 && sizeB === 0) break;
          if (sizeF === 0) expandForward = false;
          else if (sizeB === 0) expandForward = true;
          else if (minF < minB) expandForward = true;
          else if (minB < minF) expandForward = false;
          else expandForward = sizeF <= sizeB;

          if (expandForward) {
            progressed = genNext(bGen, this.fAstar, this.fRAstar);
          } else {
            progressed = genNext(rbGen, this.fRAstar, this.fAstar);
          }
        } else {
          progressed = genNext(bGen, this.fAstar, this.fRAstar);
          if (!useMeet && !useMm && finishStr) break;
          if (!finishStr || useMeet) {
            const p2 = genNext(rbGen, this.fRAstar, this.fAstar);
            progressed = progressed || p2;
          }
        }

        if (!progressed) {
          if (finishStr) break;
          throw new Error("还原失败");
        }

        if (!useMeet && !useMm && finishStr) break;

        const now = Date.now();
        const duration = now - startTimestamp;
        if (now - logTimestamp > 500) {
          logTimestamp = now;
          const s = `已遍历${cnt / 1000000}M,耗时${(duration / 1000).toFixed(
            3
          )}s,千次耗时${((duration * 1000) / cnt).toFixed(3)}ms...`;
          console.log(s);
          stepCb && stepCb(s);
          await new Promise((resolve) => {
            setTimeout(resolve, 0);
          });
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
    const path = this.getPath(finishStr);

    endTimestamp = Date.now();
    const duration = endTimestamp - startTimestamp;
    const stateCnt =
      this.fAstar.openQueue.size() +
      Object.keys(this.fAstar.closeSet).length +
      this.fRAstar.openQueue.size() +
      Object.keys(this.fRAstar.closeSet).length +
      this.fAstar.remoceCnt +
      this.fRAstar.remoceCnt;
    const remoceCnt = this.fAstar.remoceCnt + this.fRAstar.remoceCnt;
    console.log(
      `Done:还原路径${path.length}步,遍历状态${(stateCnt / 10 ** 6).toFixed(
        3
      )}M,清理内存${remoceCnt}条,耗时${(duration / 1000).toFixed(
        3
      )}s,千次耗时${((duration * 1000) / stateCnt).toFixed(3)}ms`
    );
    return path;
  }

  getPath(stateStr: string) {
    const actions = this.fAstar.getPath(stateStr);
    let rActions = this.fRAstar.getPath(stateStr);
    rActions = this.fRAstar.board.actionsReverse(rActions);
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
