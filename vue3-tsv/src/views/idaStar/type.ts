import { ActionDir, NumBoard } from "./numBoard";

export class State {
  public cost: number;
  constructor(
    public list: number[],
    // public state:string,
    public action: ActionDir,
    public beforeState: string,
    public gcost: number,
    public hcost: number // 速度优化不大但是优化内存
  ) {
    this.cost = this.gcost + this.hcost;
  }
}

// 增加state属性 BoardAstar_hp 使用
export class State2 extends State {
  constructor(
    public list: number[],
    public state:string,
    public action: ActionDir,
    public beforeState: string,
    public gcost: number,
    public hcost: number
  ) {
    super(list,
        action,
        beforeState,
        gcost,
        hcost);
  }
}

// 增加 childCnt BoardAstar_h testRemove使用
export class State3 extends State {
  constructor(
    public list: number[],
    // public state:string,
    public action: ActionDir,
    public beforeState: string,
    public gcost: number,
    public hcost: number,
    public hcost2: number,
    public childCnt: number
  ) {
    super(list, action, beforeState, gcost, hcost);
    this.cost += hcost2/2; // /2 是有必要的
  }
}