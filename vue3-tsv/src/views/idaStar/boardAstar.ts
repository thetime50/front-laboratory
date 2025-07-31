import {sortedIndexBy} from 'lodash';
import { ActionDir, NumBoard } from "./numBoard";
import { Heap } from "heap-js";

// g(n) 为已经过的距离
// h(n) 使用曼哈顿距离

class State{
    public cost:number;
    constructor(
        public list:number[],
        // public state:string,
        public action:ActionDir,
        public beforeState:string,
        public gcost:number,
        public hcost:number[]
    ){
        this.cost = this.gcost + this.hcost.reduce((t,v)=>t+v,0);
    }
}

export class BoardAstar {
    openSet: Record<string, State> = {};
    closeSet: Record<string, State> = {};
    openList: string[] = []; //优先级列表
    board=new NumBoard();

    // constructor() {}
    init(widthCnt: number, heightCnt: number, list?: number[]) {
        this.clear();
        this.board.setSize(widthCnt, heightCnt);
        list && this.board.setList(list);
    }
    clear(){
        this.openSet = {};
        this.closeSet = {};
        this.openList = [];
    }
    openDel(stateStr:string){
        // const index = this.openList.findIndex(v=>v==stateStr)
        const index = sortedIndexBy(this.openList, stateStr, (v) => {
            return this.openSet[v].cost;
        });
        if(index>=0){
            // console.log('del',stateStr, index)
            this.openList.splice(index,1);
        }
        delete this.openSet[stateStr];
    }
    openAdd(stateStr:string,state:State){
      this.openSet[stateStr] = state;
      // const index = this.openList.findIndex(v=>{
      //     const s = this.openSet[v]
      //     return s.cost>state.cost
      // })
      // Done:还原路径30步,遍历状态17599,耗时0.049s,千次耗时2.784ms
      const index = sortedIndexBy(this.openList, stateStr, (v) => {
        return this.openSet[v].cost;
      });
      if (index >= 0) {
        this.openList.splice(index, 0, stateStr);
      } else {
        this.openList.push(stateStr);
      }
    }
    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        // let stepTimestamp = startTimestamp;
        const tempStemp: { newState: State; oldState: State }[] = [];
        let cnt = 0;
        let finishStr: string | undefined = undefined;

        this.openSet[this.board.listStr] = new State(
            this.board.list,
            ActionDir.d,
            '',
            0,
            this.board.getManhattan()
        );
        this.openList.push(this.board.listStr);

        for(;this.openList.length;){
            const stateStr = this.openList[0];
            const state = this.openSet[stateStr];
            if(stateStr == this.board.finishStr){
                finishStr = stateStr;
                break;
            }

            this.closeSet[stateStr] = state;
            delete this.openSet[stateStr];
            this.openList.shift();
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
              cnt == 0 && console.log(hcost);
              const nstate = new State(
                list,
                v,
                stateStr,
                state.gcost + 1,
                hcost
              );

              const closState = this.closeSet[nstateStr];
              let openState = this.openSet[nstateStr];

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
                openState = this.openSet[nstateStr];
                if (!openState) {
                  this.openAdd(nstateStr, nstate);
                  if (nstateStr == this.board.finishStr) {
                    finishStr = nstateStr;
                    break;
                  }
                }
              }

              
            //   let now = Date.now();
            //   if (now - stepTimestamp > 2200) {
            //       throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
            //   }
            //   stepTimestamp = now;
              cnt += 1;
              const duration = Date.now() - startTimestamp;
              if (duration % 500 == 499) {
                const s = `已遍历${cnt / 1000000}M,耗时${(
                  duration / 1000
                ).toFixed(3)}s,千次耗时${(duration*1000 / cnt).toFixed(3)}ms...`;

                console.log(s);
                stepCb && stepCb(s);

                await new Promise((resolve) => {
                  setTimeout(resolve, 0);
                });
              }

              // yield nstate;
            }
        }

        if(!finishStr){
            throw new Error('还原失败');
        }
        const path = this.getPath(finishStr);
        
        endTimestamp = Date.now();
        const duration = endTimestamp - startTimestamp; 
        const stateCnt = this.openList.length + Object.keys(this.closeSet).length;
        console.log(`Done:还原路径${path.length}步,遍历状态${stateCnt},耗时${
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
        console.log(stateArr);
        return stateArr.map(v=>v.action);
    }
}



export class BoardAstar2 {
    openSet: Record<string, State> = {};
    closeSet: Record<string, State> = {};
    openQueue:Heap<string> = new Heap((a, b) => 
        this.openSet[a].cost - this.openSet[b].cost
    ) ; //优先级列表; //优先级列表
    board=new NumBoard();

    // constructor() {}
    init(widthCnt: number, heightCnt: number, list?: number[]) {
        this.clear();
        this.board.setSize(widthCnt, heightCnt);
        list && this.board.setList(list);
    }
    clear(){
        this.openSet = {};
        this.closeSet = {};
        this.openQueue.clear();
    }
    openDel(stateStr:string){
        this.openQueue.remove(stateStr, (v) => v == stateStr);
        delete this.openSet[stateStr];
    }
    openAdd(stateStr:string,state:State){
      this.openSet[stateStr] = state;
      this.openQueue.add(stateStr);
    }
    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        // let stepTimestamp = startTimestamp
        const tempStemp: { newState: State; oldState: State }[] = [];
        let cnt = 0;
        let finishStr: string | undefined = undefined;

        this.openSet[this.board.listStr] = new State(
            this.board.list,
            ActionDir.d,
            '',
            0,
            this.board.getManhattan()
        );
        this.openQueue.add(this.board.listStr);

        for(;this.openQueue.size();){
            const stateStr = this.openQueue.pop()!;
            // if (!stateStr){
            //     throw new Error("还原失败");
            // }
            const state = this.openSet[stateStr];
            if(stateStr == this.board.finishStr){
                finishStr = stateStr;
                break;
            }

            this.closeSet[stateStr] = state;
            delete this.openSet[stateStr];
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
              cnt == 0 && console.log(hcost);
              const nstate = new State(
                list,
                v,
                stateStr,
                state.gcost + 1,
                hcost
              );

              const closState = this.closeSet[nstateStr];
              let openState = this.openSet[nstateStr];

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
                openState = this.openSet[nstateStr];
                if (!openState) {
                  this.openAdd(nstateStr, nstate);
                  if (nstateStr == this.board.finishStr) {
                    finishStr = nstateStr;
                    break;
                  }
                }
              }

              
            //   let now = Date.now();
            //   if (now - stepTimestamp > 2200) {
            //       throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
            //   }
            //   stepTimestamp = now;
              cnt += 1;
              const duration = Date.now() - startTimestamp;
              if (duration % 500 == 499) {
                const s = `已遍历${cnt / 1000000}M,耗时${(
                  duration / 1000
                ).toFixed(3)}s,千次耗时${(duration*1000 / cnt).toFixed(3)}...`;

                console.log(s);
                stepCb && stepCb(s);

                await new Promise((resolve) => {
                  setTimeout(resolve, 0);
                });
              }

              // yield nstate;
            }
        }

        if(!finishStr){
            throw new Error('还原失败');
        }
        const path = this.getPath(finishStr);
        
        endTimestamp = Date.now();
        const duration = endTimestamp - startTimestamp; 
        const stateCnt = this.openQueue.size() + Object.keys(this.closeSet).length;
        console.log(`Done:还原路径${path.length}步,遍历状态${stateCnt},耗时${
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
        console.log(stateArr);
        return stateArr.map(v=>v.action);
    }
}