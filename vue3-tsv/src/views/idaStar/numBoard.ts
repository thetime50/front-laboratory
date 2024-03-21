import {sample} from "lodash";

export enum ActionDir{
    u,
    r,
    d,
    l,
}


export class NumBoard{
    public list:(number|string)[] = [];
    private canAction:[boolean,boolean,boolean,boolean][]=[];//对于当前空位坐标 空位可以移动的方向 urdl
    private readonly reverseDir:Record<ActionDir,ActionDir> = {
        [ActionDir.u]:ActionDir.d,
        [ActionDir.r]:ActionDir.l,
        [ActionDir.d]:ActionDir.u,
        [ActionDir.l]:ActionDir.r,
    };
    constructor(
        public readonly cfg={ // 为了保持响应式
            widthCnt:4,
            heightCnt:4,
            emptyIndex:-1,
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

    initList(){
        this.list = Array.from({length:this.widthCnt * this.heightCnt},(v,i)=> i);
        this.emptyIndex = this.list.length-1;
        this.list[this.emptyIndex] = 'none';
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
        this.widthCnt = widthCnt;
        this.heightCnt = heightCnt;
        this.initList();
        if(needInitCanActon){
            this.initCanAction();
        }
    }
    getCanActoinDir(index:number,before?:ActionDir){
        const res = [...this.canAction[index]];
        if(typeof before == "number"){
            res[this.reverseDir[ before]] = false;
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

    doAction(action:ActionDir){
        
        const otherCell = this.getSwitchOtherCell(this.emptyIndex,action);
        this.list[this.emptyIndex] = this.list[otherCell];
        this.list[otherCell] = "none";
        this.emptyIndex = otherCell;
    }
    doActions(actions:ActionDir[]){
        actions.forEach((a)=>{
            this.doAction(a);
        });
    }
}

export class NumBoardShow extends NumBoard{
    constructor(
        public readonly cfg={ // 为了保持响应式
            widthCnt:4,
            heightCnt:4,
            emptyIndex:-1,
            itemWidth: 30,
            gep: 4,
        }, 
    ){
        super(cfg);
    }
}