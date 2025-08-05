import {ActionDir,actoins2Str, NumBoard} from "./numBoard";

// class History{
//     constructor(
//         readonly state:string,
//         readonly action:ActionDir,
//         readonly befareState:string,
//     ){
//     }
// }

interface History{
    list:number[], // 这里可以节省接近1/3时间 避免了join split
    state:string;
    action:ActionDir;
    beforeState:string;
}


// export abstract class BfsBase<H>{
//     history:Record<string,H> = {}
//     constructor(){}

//     // abstract 
//     getChild(){
        
//     }
// }


export class BoardBfs{
    history:Record<string,History> = {};
    historyArr:string[]=[];
    public board=new NumBoard();
    // constructor(){
    // }
    init(widthCnt:number,heightCnt:number,list?:number[]){
        this.clear();
        this.board.setSize(widthCnt,heightCnt);
        list && this.board.setList(list);
    }
    clear(){
        this.history = {};
        this.historyArr = [];
    }

    // // abstract 
    // getChild(index:number,action:ActionDir){
    //     const actions = this.board.getCanActoinDir(index,action)
    // }
    // checkFinish(){
    //     return this.board.checkFinish()
    // }

    execInit(){
        const sh:History = {list:this.board.list as any, state:this.board.listStr,action:ActionDir.d,beforeState:''}; // 初始化的action 和 beforeSatate不用管
        this.history[sh.state] = sh;
        this.historyArr.push(sh.state);
    }

    async exec(stepCb?:(str:string)=>void){
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        let stepTimestamp = startTimestamp;
        let cnt = 0;
        let finish: History | undefined;

        if(this.board.checkFinish()){
            return [];
        }
        this.execInit();

        for(const {h} of this.execStep()){
            
            if(!this.history[h.state]){
                // console.log(i, state)
                this.history[h.state] = h;
                this.historyArr.push(h.state);
                if(h.state == this.board.finishStr){
                    finish = h;
                    break;
                }
            }
            cnt+=1;
            
            const now = Date.now();
            if(now - stepTimestamp > 1000){
                throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
            }
            stepTimestamp = now;

            if (cnt % 300000 == 0) {
                const duration = (Date.now()-startTimestamp); 
                const s = `已遍历${cnt/1000000}M,耗时${(duration/ 1000).toFixed(3)}s...`;
                console.log(s);
                stepCb && stepCb(s);

                await new Promise((resolve)=>{
                    setTimeout(resolve,0);
                });
            }
            // if(i>100000){
            //     throw new Error('循环过多')
            // }
        }

        if(!finish){
            throw new Error('还原失败');
        }
        const path = this.getPath();
        endTimestamp=Date.now();
        const duration = (endTimestamp - startTimestamp); 
        console.log(`Done:还原路径${path.length}步,遍历状态${
            (this.historyArr.length/10**6).toFixed(3)}M,耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/this.historyArr.length).toFixed(3)}ms`, );
        return path;
    }
    * execStep(){
        for(let i =0; i<this.historyArr.length; i++){
            const oh = this.history[ this.historyArr[i] ];
            this.board.setList(oh.list,false);
            const child = this.board.getCanActoinDir(this.board.emptyIndex,oh.beforeState?oh.action:undefined);
            const beforeState = this.board.listStr;
            for(const v of child){
                const list = this.board.doAction(v,false);
                const state = list.join(',');
                const h:History = {list:list as any,state,action:v,beforeState};
                yield {h,i};
            }
        }
    }

    getPath(state?:string){
        const finish = state || this.historyArr[this.historyArr.length-1];
        const startState = this.historyArr[0];
        let h = this.history[finish];
        const path = [h];
        for(;h.state!== startState;){
            h = this.history[h.beforeState];
            path.push(h);
        }
        path.pop();
        const actions = path.reverse().map(v=>v.action);
        return actions;
    }
}

export class BoardDBfs {
    boardBfs = new BoardBfs();
    rBoardBfs = new BoardBfs();
    // constructor() {}
    init(widthCnt: number, heightCnt: number, list: number[]) {
        this.boardBfs.init(widthCnt, heightCnt, list);
        this.rBoardBfs.init(widthCnt, heightCnt,);
    }

    clear() {
        this.boardBfs.clear();
        this.rBoardBfs.clear();
    }

    async exec(stepCb?: (str: string) => void) {
        console.log('exec');
        const startTimestamp = Date.now();
        let endTimestamp=0;
        let stepTimestamp = startTimestamp;
        let cnt = 0;
        let finish: History | undefined;

        
        this.boardBfs.execInit();
        this.rBoardBfs.execInit();

        const bGen = this.boardBfs.execStep();
        const rbGen = this.rBoardBfs.execStep();
        function genNext(gen: typeof bGen, bfs: BoardBfs,rbfs: BoardBfs) {
            const { value: step, done } = gen.next();
            if(!step || done){
                throw new Error('还原失败');
            }
            const {h,i} = step;
            if (!bfs.history[h.state]) {
                // console.log(i, state)
                bfs.history[h.state] = h;
                bfs.historyArr.push(h.state);
                if (rbfs.history[h.state]) {
                    finish = h;
                }
            }
            return i;
        }
        for (; !finish; ) {
          genNext(bGen, this.boardBfs,this.rBoardBfs);
          if(finish) break;
          genNext(rbGen, this.rBoardBfs, this.boardBfs);
          if (finish) break;


          const now = Date.now();
          if (now - stepTimestamp > 2200) {
            throw new Error(`次计算时间过长${now - stepTimestamp}ms`);
          }
          stepTimestamp = now;

          cnt+=1;
          if (cnt % 300000 == 0) {
            const duration = Date.now() - startTimestamp;
            const s = `已遍历${cnt / 1000000}M,耗时${(duration / 1000).toFixed(
              3
            )}s...`;
            console.log(s);
            stepCb && stepCb(s);

            await new Promise((resolve) => {
              setTimeout(resolve, 0);
            });
          }
          // if(i>100000){
          //     throw new Error('循环过多')
          // }
        }

        if(!finish){
            throw new Error('还原失败');
        }
        const path = this.getPath(finish.state);
        endTimestamp=Date.now();
        const duration = (endTimestamp - startTimestamp); 

        console.log(`Done:还原路径${path.length}步,遍历状态${this.boardBfs.historyArr.length},耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/this.boardBfs.historyArr.length).toFixed(3)}ms`, );
        return path;
    }

    getPath(state:string) {
        const actions = this.boardBfs.getPath(state);
        let rActions = this.rBoardBfs.getPath(state);
        rActions = rActions.reverse().map((v) => {
          const m = this.boardBfs.board.reverseDir;
          return m[v];
        });
        console.log(actoins2Str(actions), actoins2Str(rActions));
        return actions.concat(rActions);
    }
}