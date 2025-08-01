import { BoardAstar_h } from "./boardAstar_h";

/**
 * 4*4可以不限的求解
 */
export class BoardBiAstar {
    // constructor() {}
    astar = new BoardAstar_h
    rAstar = new BoardAstar_h
    init(widthCnt: number, heightCnt: number, list: number[]) {
        this.astar.init(widthCnt, heightCnt, list);
        this.rAstar.init(widthCnt, heightCnt);
        this.rAstar.setFinishList(list)
    }
    clear(){
        this.astar.clear();
        this.rAstar.clear();
    }
    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        // let stepTimestamp = startTimestamp
        let cnt = 0;
        let finishStr: string | undefined = undefined;
    
        this.astar.execInit();
        this.rAstar.execInit();
    
        const bGen = this.astar.execStep();
        const rbGen = this.rAstar.execStep();
        function genNext(gen: typeof bGen, astar1: BoardAstar_h, astar2:BoardAstar_h){
            const {value:stateStr,done} = gen.next()
            if(done){
                throw new Error('还原失败');
            }

            if(stateStr == astar1.board.finishStr || astar2.haveState(stateStr)){
                finishStr = stateStr
            }
        }
        for(;!finishStr;){
            genNext(bGen,this.astar,this.rAstar)
            if(finishStr) break
            genNext(rbGen, this.rAstar, this.astar);
            if (finishStr) break;
              
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
        }
    
        if(!finishStr){
            throw new Error('还原失败');
        }
        const path = this.getPath(finishStr);
        
        endTimestamp = Date.now();
        const duration = endTimestamp - startTimestamp; 
        const stateCnt = this.astar.openQueue.size() + Object.keys(this.astar.closeSet).length +
            this.rAstar.openQueue.size() + Object.keys(this.rAstar.closeSet).length;
        console.log(`Done:还原路径${path.length}步,遍历状态${
            (stateCnt/10**6).toFixed(3)}M,耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/stateCnt).toFixed(3)}ms`, );
        return path;
    }

    getPath(stateStr:string){
        const actions = this.astar.getPath(stateStr);
        let rActions = this.rAstar.getPath(stateStr);
        rActions = rActions.reverse().map((v) => {
          const m = this.rAstar.board.reverseDir;
          return m[v];
        });
        console.log(this.rAstar.board.actoins2Str(actions), this.rAstar.board.actoins2Str(rActions));
        
        return actions.concat(rActions);
    }
}