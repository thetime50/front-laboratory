import { ActionDir, NumBoard } from "../numBoard";
import { Heap } from "heap-js";
import { HeapPlus } from "@/js/HeapPlus";
import { State, State2, State3 } from "../type";

// g(n) 为已经过的距离
// h(n) 使用曼哈顿距离


/**
 * BoardAstar_h
u,u,l,l,u,l,d,r,r,d,d,r,u,u,l,l,d,d,l,u,r,u,l,u,r,d,r,u,r,d,l,l,
l,u,r,d,d,d,l,u,u,u,r,r,r,d,l,l,u,r,d,l,l,d,r,r,d,r,u,l,u,l,u,r

openQueue + openSet
Done:还原路径40步,遍历状态3.880M,耗时15.071s,千次耗时3.884ms

速度优化很多
 */

export class BoardAstar_h {
    openSet: Record<string, State3> = {};
    closeSet: Record<string, State3> = {};
    openQueue:Heap<string> = new Heap((a, b) => 
        this.openSet[a].cost - this.openSet[b].cost || // 总代价小
            this.openSet[b].gcost - this.openSet[a].gcost // 总代价相同时已经过距离大
    ) ; //优先级列表
    board=new NumBoard();
    removeSet = new Set<string>()
    remoceCnt = 0 //已移除的内存计数

    // constructor() {}
    setFinishList(list:number[] | string,check=true){
        this.board.setFinishtList(list, check);
    }
    init(widthCnt: number, heightCnt: number, list?: number[]) {
        this.clear();
        this.board.setSize(widthCnt, heightCnt);
        list && this.board.setList(list);
    }
    clear(){
        this.openSet = {};
        this.closeSet = {};
        this.openQueue.clear();
        this.removeSet.clear()
        this.remoceCnt = 0;
    }
    openDel(stateStr:string){
        this.openQueue.remove(stateStr); // , (v) => v == stateStr);
        delete this.openSet[stateStr];
    }
    openAdd(stateStr:string,state:State3){
      this.openSet[stateStr] = state;
      this.openQueue.add(stateStr);
    }
    haveState(stateStr: string){
        return this.openSet[stateStr] || this.closeSet[stateStr]
    }
    * execStep() {
        for(;this.openQueue.size();){
            const stateStr = this.openQueue.pop()!;
            // if (!stateStr){
            //     throw new Error("还原失败");
            // }
            const state = this.openSet[stateStr];

            this.closeSet[stateStr] = state;
            delete this.openSet[stateStr];
            // if(stateStr == this.board.finishStr){
            //     finishStr = stateStr;
            //     break;
            // }
            // this.openDel(stateStr)

            this.board.setList(state.list, false);
            const child = this.board.getCanActoinDir(this.board.emptyIndex,state.beforeState?state.action:undefined);
            for(const v of child){
              const list = this.board.doAction(v, false);
              const nstateStr = list.join(",");
              // l,u,u,r,d,d,l,u,l,d,r,u,u,r,d,d,l,u,r,u,u,l,l,l,d,r,d,r,u,r,u,l
              // Done:还原路径28步,遍历状态5849,耗时0.069s,千次耗时11.797ms
              //   let hcost = this.board.getManhattan(list);

              // Done:还原路径28步,遍历状态5849,耗时0.066s,千次耗时11.284ms
              const hcost = this.board.updateManhattan( // 差不多
                state.hcost, // 执行前的代价
                list, // 执行后的列表
                this.board.emptyIndex, // 空位
                v // 动作
              );
              const nstate = new State3(
                list,
                v,
                stateStr,
                state.gcost + 1,
                hcost,
                0
              );

              const closState = this.closeSet[nstateStr];
              let openState = this.openSet[nstateStr];

              if (closState) {
                // 判断更新代价
                // if (closState.cost > nstate.cost) {
                // }
              } else {
                // if (openState) {
                //   if (openState.cost > nstate.cost) {
                //     // tempStemp.push({ newState: nstate, oldState: closState });

                //     // 在这个节点需要用新的结果替换旧的，并且把旧结果的父节点child-1
                //     let beforeState = this.openSet[openState.beforeState]
                //     let addRemove = false
                //     if(!beforeState){
                //         beforeState = this.closeSet[openState.beforeState]
                //         addRemove = true
                //     }
                //     beforeState.childCnt -= 0
                //     if (beforeState.childCnt <= 0 && addRemove){
                //         this.removeSet.add(openState.beforeState);
                //     }
                //     this.openDel(nstateStr); // 这里会增加几十ms
                //   }
                // }
                openState = this.openSet[nstateStr];
                if (!openState) {
                  this.openAdd(nstateStr, nstate);
                  state.childCnt += 1
                  yield nstateStr
                }
              }
            }
            if (state.childCnt <= 0) {
              this.removeSet.add(stateStr);
            }
        }
    }
    execInit(){
        this.openSet[this.board.listStr] = new State3(
          this.board.list,
          ActionDir.d,
          "",
          0,
          this.board.getManhattan(),
          0
        );
        this.openQueue.add(this.board.listStr);
    }
    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        // let stepTimestamp = startTimestamp
        let logTimestamp = startTimestamp
        let removeRunCnt = 0
        const tempStemp: { newState: State3; oldState: State3 }[] = [];
        let cnt = 0;
        let finishStr: string | undefined = undefined;

        this.execInit()
        if(this.board.listStr == this.board.finishStr){
            finishStr = this.board.listStr;
        }else{
            for(const nstateStr of this.execStep()){

                if(nstateStr == this.board.finishStr){
                    finishStr = nstateStr
                    break
                }
                
                let now = Date.now();
                //   if (now - stepTimestamp > 2200) {
                //       throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
                //   }
                //   stepTimestamp = now;
                cnt += 1;
                const duration = now - startTimestamp;
                if (now - logTimestamp > 500) {
                    logTimestamp = now
                    const s = `已遍历${cnt / 1000000}M,耗时${(
                    duration / 1000
                    ).toFixed(3)}s,千次耗时${(duration*1000 / cnt).toFixed(3)}ms...`;

                    console.log(s,this.removeSet.size);
                    stepCb && stepCb(s);

                    await new Promise((resolve) => {
                    setTimeout(resolve, 0);
                    });
                }

                removeRunCnt += 1
                if (removeRunCnt > 1000000) {
                  this.removeTest();
                  removeRunCnt=0
                }
            }
        }

        if(!finishStr){
            throw new Error('还原失败');
        }
        const path = this.getPath(finishStr);
        
        endTimestamp = Date.now();
        const duration = endTimestamp - startTimestamp; 
        const stateCnt = this.openQueue.size() + Object.keys(this.closeSet).length + this.remoceCnt;
        console.log(`Done:还原路径${path.length}步,遍历状态${
            (stateCnt/10**6).toFixed(3)}M,清理内存${this.remoceCnt}条,耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/stateCnt).toFixed(3)}ms`, );
        console.log("tempStemp",tempStemp);
        return path;
    }

    getPath(stateStr:string){
        const lastState = this.closeSet[stateStr] || this.openSet[stateStr];

        const stateArr= [];
        let currentState = lastState;
        while(currentState.beforeState){
            stateArr.push(currentState);
            currentState = this.closeSet[currentState.beforeState];
        }
        stateArr.reverse();
        console.log("getPath",stateArr);
        return stateArr.map(v=>v.action);
    }

    // open 的空间太多导致 1000 000 条也只回收了2000 到10 000条
    removeTest(){
        const removeArr = Array.from(this.removeSet)
        for(let i=0; i<removeArr.length;i++){
            const stateStr = removeArr[i];
            const state = this.closeSet[stateStr]
            const pstr = state.beforeState
            if (!pstr) continue
            const parent = this.closeSet[pstr];
            parent.childCnt -= 1;
            if (parent.childCnt <= 0) {
              removeArr.push(pstr);
              this.removeSet.add(pstr)
            }
        }
        removeArr.forEach((v)=>{
            delete this.closeSet[v]
        })
        console.log(`清理内存${removeArr.length}条数据`);
        this.remoceCnt += removeArr.length
        this.removeSet.clear()
    }
}


// 已遍历0.00359M,耗时0.999s,千次耗时278.273ms...
// 非常慢
export class BoardAstar_hp {
    openQueue:HeapPlus<State2> = new HeapPlus((a, b) => 
        a.cost - a.cost
    ) ; //优先级列表
    closeSet: Record<string, State2> = {};
    board=new NumBoard();

    // constructor() {}
    init(widthCnt: number, heightCnt: number, list?: number[]) {
        this.clear();
        this.board.setSize(widthCnt, heightCnt);
        list && this.board.setList(list);
    }
    clear(){
        this.openQueue.clear();
        this.closeSet = {};
    }
    openDel(stateStr:string){
        this.openQueue.remove(null as any, (v) => v.state == stateStr);
    }
    openAdd(state:State2){
      this.openQueue.add(state);
    }
    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        // let stepTimestamp = startTimestamp
        let logTimestamp = startTimestamp;
        const tempStemp: { newState: State; oldState: State }[] = [];
        let cnt = 0;
        let finish: State2|undefined = undefined;

        this.openAdd( new State2(
          this.board.list,
          this.board.listStr,
          ActionDir.d,
          "",
          0,
          this.board.getManhattan()
        ));

        for(;this.openQueue.size();){
            cnt%10000 ==0 && console.log("aa echo");
            cnt%10000 <5 && console.log("aa start");
            cnt % 10000 < 5 && console.time("aa");
            const stateobj = this.openQueue.pop()!;
            // if (!state){
            //     throw new Error("还原失败");
            // }
            if(stateobj.state == this.board.finishStr){
                finish = stateobj;
                break;
            }

            this.closeSet[stateobj.state] = stateobj;

            this.board.setList(stateobj.list, false);
            const child = this.board.getCanActoinDir(this.board.emptyIndex,stateobj.beforeState?stateobj.action:undefined);
            for(const v of child){
              const list = this.board.doAction(v, false);
              const nstateStr = list.join(",");
              // l,u,u,r,d,d,l,u,l,d,r,u,u,r,d,d,l,u,r,u,u,l,l,l,d,r,d,r,u,r,u,l
              // Done:还原路径28步,遍历状态5849,耗时0.069s,千次耗时11.797ms
              //   let hcost = this.board.getManhattan(list);

              // Done:还原路径28步,遍历状态5849,耗时0.066s,千次耗时11.284ms
              const hcost = this.board.updateManhattan( // 差不多
                stateobj.hcost, // 执行前的代价
                list, // 执行后的列表
                this.board.emptyIndex, // 空位
                v // 动作
              );
              cnt == 0 && console.log(hcost);
              const nstate = new State2(
                list,
                nstateStr,
                v,
                stateobj.state,
                stateobj.gcost + 1,
                hcost
              );

              const closState = this.closeSet[nstateStr];
              let openState = this.openQueue.find(undefined as any,(e,o)=>{
                return e.state == nstateStr;
              });

              if (closState) {
                // 判断更新代价
                if (closState.cost > nstate.cost) {
                  tempStemp.push({ newState: nstate, oldState: closState });
                }
              } else {
                if (openState) {
                  if (openState.cost > openState.cost) {
                    // tempStemp.push({ newState: nstate, oldState: closState });
                    this.openDel(nstateStr);
                  }
                }
                openState = this.openQueue.find(undefined as any, (e, o) => {
                  return e.state == nstateStr;
                });
                cnt%10000 <5 && console.timeLog("aa");

                // 这两个find很花时间add稍微花一点
                if (!openState) {
                  this.openAdd(nstate);
                  if (nstateStr == this.board.finishStr) {
                    finish = nstate;
                    break;
                  }
                }
              }
              cnt%10000 <5 && console.timeEnd("aa");

              
              let now = Date.now();
            //   if (now - stepTimestamp > 2200) {
            //       throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
            //   }
            //   stepTimestamp = now;
              cnt += 1;
              const duration = Date.now() - startTimestamp;
              if (now - logTimestamp > 500) {
                logTimestamp = now;
                const s = `已遍历${cnt / 1000000}M,耗时${(
                  duration / 1000
                ).toFixed(3)}s,千次耗时${(duration*1000 / cnt).toFixed(3)}ms...`;

                console.log(s);
                stepCb && stepCb(s);

                await new Promise((resolve) => {
                  setTimeout(resolve, 0);
                });
              }
            }
        }

        if(!finish){
            throw new Error('还原失败');
        }
        const path = this.getPath(finish);
        
        endTimestamp = Date.now();
        const duration = endTimestamp - startTimestamp; 
        const stateCnt = this.openQueue.size() + Object.keys(this.closeSet).length;
        console.log(`Done:还原路径${path.length}步,遍历状态${
            (stateCnt/10**6).toFixed(3)}M,耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/stateCnt).toFixed(3)}ms`, );
        console.log("tempStemp",tempStemp);
        return path;
    }

    getPath(state:State2){
        const lastState = state;

        const stateArr= [];
        let currentState = lastState;
        while(currentState.beforeState){
            stateArr.push(currentState);
            currentState = this.closeSet[currentState.beforeState];
        }
        stateArr.reverse();
        console.log("getPath", stateArr);
        return stateArr.map(v=>v.action);
    }
}