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


// u,u,l,l,d,r,r,u,l,l,d,r,d,l,l,u,r,r,d,l,l,u,u,r,d,l,u,r,u,l,d,r,u,r,d,d,l,u,l,d,d,r,u,r,r,d,l,l,u,r,u,r,d,d,l,l,l,u,r,u,u,r,r,d,l,u,l,d,r,d,l,u
// 解 d,r,u,l,u,r,d,r,u,l,l,d,d,l,d,r,r,r,u,u,l,d,l,d,r,r,u,l,l,d,l,u,u,r,d,r,u,u,l,d,l,u,r,d,l,d,r,u,l,d,d,r,r,u,l,l,d,r,r,u,l,u,r,r,d,l,l,u,r,r,d,d
// 无优化 Done:还原路径70步,遍历状态2.923M,清理内存6753条,耗时14.111s,千次耗时4.827ms
// 相邻优化 Done:还原路径72步,遍历状态0.479M,清理内存0条,耗时2.085s,千次耗时4.351ms

export class NumBoard{
    public list:number[] = [];
    public checkStr='';
    public finishStr='';
    public finishMap:Record<number,number> = {}; // 数字对应的位置映射表
    public finishNum2Idx:Record<number,{idx:number,num:number,adjIdx:number[],adjNum:number[]}> = {}; // 数字对应的位置映射表
    public finishIdx2Num:Record<number,{idx:number,num:number,adjIdx:number[],adjNum:number[]}> = {}; // 数字对应的位置映射表
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
        this.setFinishtList(this.list);
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
                this.list[i] = ll[i];
            });
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
        return actions.map((v)=>ActionDir[v]).join(',');
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
            return v== this.emptyNum ? 0 : this.manhattan(this.finishMap[v], i); // 排除空位
        });
        return dis.reduce((t,v)=>t+v,0);
    }
    /**
     * 更新曼哈顿距离
     * @param oldDis 
     * @param list 移动后的列表
     * @param index 移动前的空格位置
     * @param action 动作
     * @returns 
     */
    updateManhattan(oldDis:number,list:number[],index:number,action:ActionDir){
        
        const width = this.widthCnt;
        const d1 = this.manhattan(this.finishMap[list[index]], index); // 移动后的距离
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
        const d2 = this.manhattan(this.finishMap[list[index]], index2);// 移动前的距离

        const newDis = oldDis + d1 - d2;

        // console.log(
        //   list,
        //   action,
        //   index,
        //   newDis == this.getManhattan(list)
        // );
        return newDis;
    }

    getAdjacent(list?:number[],nn = -1) {
        const m = this.widthCnt,n = this.heightCnt;
        const size = m * n;
        const emptyNum = this.emptyNum;
        let totalDistance = 0;
        list = list || this.list;

        // 数字 -> 当前所在位置索引
        const pos = new Array(size);
        for (let idx = 0; idx < size; idx++) {
            pos[list[idx]] = idx;
        }

        if (nn >= 0) {
            const min = nn,max = nn + 1;
            for (let num = min; num < max; num++) { // 遍历数字
                if (num === emptyNum) continue; // 空格不算
                const idx = pos[num];
                const item = this.finishNum2Idx[num];
                totalDistance += item.adjNum.reduce((t, num1) => {
                    const idx1 = pos[num1];
                    return num1 == emptyNum ? t : t + this.manhattan(idx,idx1)-1;
                }, 0);
            }
        }else{
            for (let i = 0; i < size; i++) { // 遍历原始位置
                if (this.finishIdx2Num[i].num === emptyNum) continue; // 空格不算
                // 横向相邻
                if (i % n !== n - 1) {
                    const j = i + 1;
                    if (this.finishIdx2Num[j].num !== emptyNum) {
                        const ax = Math.floor(pos[this.finishIdx2Num[i].num] / n);
                        const ay = pos[this.finishIdx2Num[i].num] % n;
                        const bx = Math.floor(pos[this.finishIdx2Num[j].num] / n);
                        const by = pos[this.finishIdx2Num[j].num] % n;
                        totalDistance += Math.abs(ax - bx) + Math.abs(ay - by) - 1;
                    }
                }

                // 纵向相邻
                if (Math.floor(i / n) !== m - 1) {
                    const j = i + n;
                    if (this.finishIdx2Num[j].num !== emptyNum) {
                        const ax = Math.floor(pos[this.finishIdx2Num[i].num] / n);
                        const ay = pos[this.finishIdx2Num[i].num] % n;
                        const bx = Math.floor(pos[this.finishIdx2Num[j].num] / n);
                        const by = pos[this.finishIdx2Num[j].num] % n;
                        totalDistance += Math.abs(ax - bx) + Math.abs(ay - by) - 1;
                    }
                }
            }
        }
        return totalDistance;
    }
    /**
     * 更新相邻距离
     * @param oldDis 
     * @param list 移动后的列表
     * @param index 移动前的空格位置
     * @param action 动作
     * @returns 
     */
    updateAdjacent(oldDis:number,list:number[],index:number,action:ActionDir){
        const width = this.widthCnt;
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
        const list1 = list.concat();
        const temp = list1[index2];
        list1[index2] = list1[index];
        list1[index] = temp;
        const d1 = this.getAdjacent(list, list[index]); // 移动后的距离
        const d2 = this.getAdjacent(list1, list1[index2]);// 移动前的距离

        const newDis = oldDis + d1 - d2;

        // console.log(
        //   list,
        //   action,
        //   index,
        //   newDis , this.getAdjacent(list)
        // );
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

        this.finishMap = ll.reduce((t,v,i,a)=>{
            // t[i] = v
            t[v] = i;
            return t;
        },{} as Record<number,number>);
        this.finishStr = ll.join(',');

        this.finishNum2Idx = {};
        this.finishIdx2Num = {};
        ll.forEach((v, i, a) => {
            // t[i] = v
            const adjIdx:number[] = [];
            const adjNum:number[] = [];
            if(i>=this.widthCnt){
                adjIdx.push(i-this.widthCnt);
                adjNum.push(ll[i - this.widthCnt]);
            }
            if(i+this.widthCnt < this.widthCnt*this.heightCnt){
                adjIdx.push(i + this.widthCnt);
                adjNum.push(ll[i + this.widthCnt]);
            }
            if(i%this.widthCnt!==0){
                adjIdx.push(i - 1);
                adjNum.push(ll[i - 1]);
            }
            if (i % this.widthCnt !== this.widthCnt-1) {
              adjIdx.push(i + 1);
              adjNum.push(ll[i + 1]);
            }
            this.finishIdx2Num[i] = this.finishNum2Idx[v] = {
              idx: i,
              num: v,
              adjIdx,
              adjNum,
            };
        }, );
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
