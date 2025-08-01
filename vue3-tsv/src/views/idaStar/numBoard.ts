import {sample} from "lodash";

export enum ActionDir{
    u,
    r,
    d,
    l,
}

export function actoins2Str(actions:number[]){
    return actions.map((v) => ActionDir[v]).join(",");
}


export class NumBoard{
    public list:number[] = [];
    public checkStr='';
    public finishStr='';
    public finishMap:Record<number,number> = {}; // 数字对应的位置映射表
    private canAction:[boolean,boolean,boolean,boolean][]=[];//对于当前空位坐标 空位可以移动的方向 urdl
    readonly reverseDir:Record<ActionDir,ActionDir> = {
        [ActionDir.u]:ActionDir.d,
        [ActionDir.r]:ActionDir.l,
        [ActionDir.d]:ActionDir.u,
        [ActionDir.l]:ActionDir.r,
    };
    readonly actoins2Str = actoins2Str;
    constructor(
        public readonly cfg={ // 为了保持响应式
            widthCnt:4,
            heightCnt:4,
            emptyIndex:-1,
            emptyNum:-1,
        },
    ){
        this.cfg = cfg;
        this.initList();
        this.initCanAction();
    }
    get widthCnt(){
        return this.cfg.widthCnt;
    }
    set widthCnt(v:number){
        this.cfg.widthCnt = v;
    }
    
    get heightCnt(){
        return this.cfg.heightCnt;
    }
    set heightCnt(v:number){
        this.cfg.heightCnt = v;
    }
    get emptyIndex(){
        return this.cfg.emptyIndex;
    }
    set emptyIndex(v:number){
        this.cfg.emptyIndex = v;
    }
    get emptyNum(){
        return this.cfg.emptyNum;
    }

    get listStr(){
        return this.list.join(',');
    }
    set listStr(str:string){
        // let arr = str.split(',')
        this.setList(str);
    }

    initList(){
        this.list = Array.from({length:this.widthCnt * this.heightCnt},(v,i)=> i);
        this.checkStr = this.list.sort((a: any, b: any) => a - b).join(",");
        this.setFinishtList(this.list)
        this.emptyIndex = this.list.length-1;
        this.cfg.emptyNum = this.emptyIndex;
    }
    checkFinish(){
        return this.listStr == this.finishStr;
    }
    initCanAction(){
        // urdl
        const dirAll:[boolean,boolean,boolean,boolean] = [true,true,true,true];
        const dirRdl:[boolean,boolean,boolean,boolean] = [false,true,true,true];
        const dirUrl:[boolean,boolean,boolean,boolean] = [true,true,false,true];
        const dirUrd:[boolean,boolean,boolean,boolean] = [true,true,true,false];
        const dirUdl:[boolean,boolean,boolean,boolean] = [true,false,true,true];
        const length = this.widthCnt * this.heightCnt;
        this.canAction = Array.from({length:length}).fill(dirAll) as [boolean,boolean,boolean,boolean][];
        const lastLineIndex = (this.heightCnt-1)*this.widthCnt;
        for(let i=0; i<this.widthCnt; i++){
            this.canAction[i] = dirRdl;
            this.canAction[i+lastLineIndex] = dirUrl;
        }
        for(let i=0; i<length; i+=this.widthCnt){
            this.canAction[i] = dirUrd;
            this.canAction[i+this.widthCnt-1] = dirUdl;
        }
        this.canAction[0] = [false,true,true,false];
        this.canAction[this.widthCnt-1] = [false,false,true,true];
        this.canAction[lastLineIndex] = [true,true,false,false];
        this.canAction[length-1] = [true,false,false,true];
    }
    setSize(widthCnt:number,heightCnt:number){
        const needInitCanActon= this.widthCnt != widthCnt||
                    this.heightCnt != heightCnt ;
        this.widthCnt = Number( widthCnt);
        this.heightCnt = Number( heightCnt);
        this.initList();
        if(needInitCanActon){
            this.initCanAction();
        }
    }
    reset(){
        this.initList();
    }
    setList(list:number[] | string,check=true,each = false){
        const ll = typeof list == 'string' ? list.split(/[,\s]+/).map(v=>Number(v)) : list;
        if(ll.length!==this.list.length){
            throw new Error(`更新位置长度错误${ll.length},应为${this.list.length}`);
        }
        if(check && ll.concat().sort((a:any,b:any)=>(a-b)).join(',') !== this.checkStr){
            console.log(`数组内容错误`,ll);
            throw new Error(`数组内容错误`); 
        }

        if(each){
            this.list.forEach((v,i)=>{
                this.list[i] = ll[i]
            })
        }else{
            this.list = ll.concat();
        }
        this.emptyIndex = ll.findIndex(v=>v==this.cfg.emptyNum);
    }
    getCanActoinDir(index:number,before?:ActionDir){
        const res = [...this.canAction[index]];
        if(typeof before == "number"){
            res[this.reverseDir[ before]] = false; // 排除之前移动过的方向，避免重复
        }
        return res.reduce((t,v,i,a)=>{
            if(v){
                t.push(i as ActionDir);
            }
            return t;
        },[] as ActionDir[]);
    }
    getSwitchOtherCell(i:number,dir:ActionDir){
        if(dir == ActionDir.u){
            if(i < this.widthCnt) 
                throw new Error(`index:${i} dir:${ActionDir[dir]}超出范围`);
            return i-this.widthCnt;
        }
        if(dir == ActionDir.r){
            if(i%this.widthCnt == this.widthCnt-1) 
                throw new Error(`index:${i} dir:${ActionDir[dir]}超出范围`);
            return i+1;
        }
        if(dir == ActionDir.d){
            if(i+this.widthCnt >= this.widthCnt*this.heightCnt) 
                throw new Error(`index:${i} dir:${ActionDir[dir]}超出范围`);
            return i+this.widthCnt;
        }
        if(dir == ActionDir.l){
            if(i%this.widthCnt == 0) 
                throw new Error(`index:${i} dir:${ActionDir[dir]}超出范围`);
            return i-1;
        }
        throw new Error(`dir:${dir} 错误的dir`);
    }

    getRandomActions(step:number){
        let emptyi = this.emptyIndex; // this.list.length-1;
        const actions:ActionDir[] = [];

        actions.push(
            sample(this.getCanActoinDir(emptyi))!
        );
        emptyi = this.getSwitchOtherCell(emptyi,actions[0]);
        for(let i =1; i<step;i++){
            const action = sample(this.getCanActoinDir(emptyi,actions[i-1]))!;
            actions.push(
                action
            );
            emptyi = this.getSwitchOtherCell(emptyi,action);
        }
        return actions;
    }
    
    actionsToString(actions:ActionDir[]){
        return actions.map((v)=>ActionDir[v]);
    }

    doAction(action:ActionDir,exec=true){
        
        const otherCell = this.getSwitchOtherCell(this.emptyIndex,action);
        let list = this.list;
        if(!exec){
            list = list.concat();
        }
        const v = list[this.emptyIndex];
        list[this.emptyIndex] = list[otherCell];
        list[otherCell] = v;
        if(exec){
            this.emptyIndex = otherCell;
        }
        return list;
    }
    doActions(actions:ActionDir[]){
        actions.forEach((a)=>{
            this.doAction(a);
        });
    }


    manhattan(current:number,origin:number){
        const width = this.widthCnt;
        const xdiff = Math.abs(Math.floor(current / width) - Math.floor(origin / width));
        const ydiff = Math.abs(current % width - origin % width);
        return xdiff+ydiff;
    }
    getManhattan(list?:number[]){
        const dis = (list||this.list).map((v,i)=>{
            return this.manhattan(this.finishMap[i], v);
        });
        return dis;
    }
    updateManhattan(oldDis:number[],list:number[],index:number,action:ActionDir){
        const newDis = oldDis.concat();
        
        const width = this.widthCnt;
        const d1 = this.manhattan(this.finishMap[index], list[index]);
        let index2 = index;
        if (action == ActionDir.d) {
            index2 += width;
        }else if (action == ActionDir.u) {
            index2 -= width;
        }else if (action == ActionDir.l) {
            index2 -= 1;
        }else if (action == ActionDir.r) {
            index2 += 1;
        }
        const d2 = this.manhattan(this.finishMap[index2], list[index2]);

        newDis[index] = d1;
        newDis[index2] = d2;

        return newDis;
    }

    setFinishtList(list:number[] | string,check=true){
        const ll = typeof list == 'string' ? list.split(/[,\s]+/).map(v=>Number(v)) : list;
        if(ll.length!==this.list.length){
            throw new Error(`更新位置长度错误${ll.length},应为${this.list.length}`);
        }
        if(check && ll.concat().sort((a:any,b:any)=>(a-b)).join(',') !== this.checkStr){
            console.log(`数组内容错误`,ll);
            throw new Error(`数组内容错误`); 
        }

        this.finishMap = this.list.reduce((t,v,i,a)=>{
            // t[i] = v
            t[v] = i;
            return t
        },{} as Record<number,number>)
        this.finishStr = ll.join(',')
    }
}

export class NumBoardShow extends NumBoard{
    constructor(
        public readonly cfg={ // 为了保持响应式
            widthCnt:4,
            heightCnt:4,
            emptyIndex:-1,
            emptyNum:-1,
            itemWidth: 30,
            gep: 4,
        }, 
    ){
        super(cfg);
    }
}