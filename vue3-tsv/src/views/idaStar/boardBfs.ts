import { h } from "vue"
import {ActionDir, NumBoard} from "./numBoard"
import { theme } from "ant-design-vue";

// class History{
//     constructor(
//         readonly state:string,
//         readonly action:ActionDir,
//         readonly befareState:string,
//     ){
//     }
// }

interface History{
    list:number[], // 这里可以节省接近1/3
    state:string;
    action:ActionDir;
    beforeState:string;
}


export abstract class BfsBase<H>{
    history:Record<string,H> = {}
    constructor(){}

    // abstract 
    getChild(){
        
    }
}


export class BoardBfs{
    history:Record<string,History> = {}
    historyArr:string[]=[]
    public board=new NumBoard()
    constructor(){
    }
    init(widthCnt:number,heightCnt:number,list:(number |string)[]){
        this.clear()
        this.board.setSize(widthCnt,heightCnt)
        this.board.setList(list)
    }
    clear(){
        this.history = {}
        this.historyArr = []
    }

    // // abstract 
    // getChild(index:number,action:ActionDir){
    //     const actions = this.board.getCanActoinDir(index,action)
    // }
    // checkFinish(){
    //     return this.board.checkFinish()
    // }

    async exec(stepCb?:(str:string)=>void){
        console.log('exec')
        let startTimestamp = Date.now(),endTimestamp=0
        let stepTimestamp = startTimestamp
        let finish: History | undefined

        let sh:History = {list:this.board.list as any, state:this.board.listStr,action:ActionDir.d,beforeState:''} // 初始化的action 和 beforeSatate不用管
        this.history[sh.state] = sh
        this.historyArr.push(sh.state)
        if(this.board.checkFinish()){
            return []
        }

        for(let {h,i} of this.execStep()){
            
            if(!this.history[h.state]){
                // console.log(i, state)
                this.history[h.state] = h
                this.historyArr.push(h.state)
                if(h.state == this.board.finishStr){
                    finish = h
                    break
                }
            }
            
            let now = Date.now()
            if(now - stepTimestamp > 1000){
                throw new Error(`次计算时间过长${now - stepTimestamp}ms`)
            }
            stepTimestamp = now

            if(i%100000==0){
                const duration = (Date.now()-startTimestamp) 
                const s = `已遍历${i/1000}k,耗时${(duration/ 1000).toFixed(3)}s...`
                console.log(s)
                stepCb && stepCb(s)

                await new Promise((resolve)=>{
                    setTimeout(resolve,0)
                })
            }
            // if(i>100000){
            //     throw new Error('循环过多')
            // }
        }

        if(!finish){
            throw new Error('还原失败')
        }
        const path = this.getPath()
        endTimestamp=Date.now()
        const duration = (endTimestamp - startTimestamp) 
        console.log(`Done:还原路径${path.length}步,遍历状态${this.historyArr.length},耗时${
            (duration/ 1000).toFixed(3)}s,千次耗时${
            (duration*1000/this.historyArr.length).toFixed(3)}ms`, )
        return path
    }
    * execStep(){
        for(let i =0; i<this.historyArr.length; i++){
            let oh = this.history[ this.historyArr[i] ]
            this.board.setList(oh.list,false)
            const child = this.board.getCanActoinDir(this.board.emptyIndex)
            const beforeState = this.board.listStr
            for(const v of child){
                let list = this.board.doAction(v,false)
                let state = list.join(',')
                const h:History = {list:list as any,state,action:v,beforeState}
                yield {h,i}
            }
        }
    }

    getPath(){
        const finish = this.historyArr[this.historyArr.length-1]
        const startState = this.historyArr[0]
        let h = this.history[finish]
        let path = [h]
        for(;h.state!== startState;){
            h = this.history[h.beforeState]
            path.push(h)
        }
        path.pop()
        const actions = path.reverse().map(v=>v.action)
        return actions
    }
}

class BDBfs{
    constructor(){}
}