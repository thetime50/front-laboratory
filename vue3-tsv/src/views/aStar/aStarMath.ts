import { 
    init as zrInit, ZRenderType, Circle, Rect, Line, Text, 
    Group, Element, Displayable, ElementEvent, 
} from "zrender"
import { ElementEventName } from 'zrender/lib/core/types';

// interface Point{ // 绘图位置
//     x:number,
//     y:number
// }
interface Coord { // 索引位置
    x: number,
    y: number
}

enum AStarItemType {
    Ground = 'Ground',
    Wall = 'Wall',
    Source = 'Source',
    Target = 'Target',
}
interface CanvasConfig {
    gep: number,
    size: number,
    shape: string,
    width: number,
    height: number,
    widthCnt: number,
    heightCnt: number,
}

// https://www.tutorialspoint.com/typescript/typescript_object_prototype.htm
// https://stackoverflow.com/questions/26780224/defining-prototype-property-in-typescript
function protoAttr(value: any) {
    return ((target: any, key: string/* , desc:PropertyDecorator */) => {
        target[key] = value;
    });
}
// Object.defineProperty(ShapeItem.prototype, 'emptyColor = "#eee" })
// Object.defineProperty(ShapeItem.prototype, 'groundColor = '#333' })
// Object.defineProperty(ShapeItem.prototype, 'sourceColor = 'hsl(240,100%,55%)' })
// Object.defineProperty(ShapeItem.prototype, 'targetColor = 'hsl(0,100%,55%)' })

interface ShapeItemPrototype {
    emptyColor?: string
    groundColor?: string
    sourceColor?: string
    targetColor?: string
}
class ShapeItem {
    zshape: Circle | Rect
    tshape: Text
    rate = 0
    value?: number
    empty = true // if type is Ground
    itemColor:string
    type: AStarItemType

    @protoAttr("#eee")
    emptyColor= '' // 这样鞋依然会在初始化时被赋值实例属性undefined
    @protoAttr("#333")
    groundColor= ''
    @protoAttr("hsl(240,100%,55%)")
    sourceColor= ''
    @protoAttr("hsl(0,100%,55%)")
    targetColor= ''

    constructor(public coord: Coord, cfg: CanvasConfig) {
        const self = this as ShapeItemPrototype
        if (Object.prototype.hasOwnProperty.call(this, 'emptyColor')) {
            delete self.emptyColor
        }
        if (Object.prototype.hasOwnProperty.call(this, 'groundColor')) {
            delete self.groundColor
        }
        if (Object.prototype.hasOwnProperty.call(this, 'sourceColor')) {
            delete self.sourceColor
        }
        if (Object.prototype.hasOwnProperty.call(this, 'targetColor')) {
            delete self.targetColor
        }

        this.rate = 0
        this.value = 0
        this.empty = true
        this.itemColor = this.getItemColor()
        this.type = AStarItemType.Ground
        const style = {
            fill: this.itemColor,
            stroke: 'none'
        }

        const x = (cfg.gep + cfg.size) * coord.x + cfg.gep
        const y = (cfg.gep + cfg.size) * coord.y + cfg.gep
        let zshape

        // console.log(this,this.option,opt.zr,opt.shape)
        switch (cfg.shape) {
            case "Rect":{
                const shape = {//圆型参数
                    x: x,
                    y: y,
                    r: cfg.size * 0.2,
                    width: cfg.size,
                    height: cfg.size,
                }
                zshape = new Rect({ shape,style })
                }break;
            case "Circle":
            default:{
                const shape = {//圆型参数
                    cx: x + cfg.size / 2,
                    cy: y + cfg.size / 2,
                    r: cfg.size / 2,
                }
                zshape = new Circle({ shape, style })
                
                }break;
        }
        this.zshape = zshape
        this.tshape = new Text({
            x: x,
            y: y,
            style:{
                text: '',
                fontSize: 12,
                opacity: 0.4
            },
            
        })
    }
    rangeTrans(x: number,x1: number,x2: number,y1: number,y2: number,){
        const k = (y2 - y1) / (x2 - x1)
        const b = y1 - k * x1
        return k * x + b
    }
    rate2color(rate: number) {
        Math.max(0, Math.min(1, rate))

        // h 0-1 对应240-0
        // l 0-1 对应 90-60
        const hue = this.rangeTrans(this.rate, 0, 1, 240, 0)
        const light = this.rangeTrans(this.rate, 0, 1, 95, 70)
        return `hsl(${hue},100%,${light}%)`
    }
    getItemColor(){
        if (this.type === AStarItemType.Wall){
            return this.groundColor
        } else if (this.type === AStarItemType.Source) {
            return this.sourceColor
        } else if (this.type === AStarItemType.Target) {
            return this.targetColor
        } else if(this.empty){
            return this.emptyColor
        }else{
            return this.rate2color(this.rate)
        }
    }

    itemRefresh(){
        this.itemColor = this.getItemColor();
        (this.zshape as Displayable).attr('style', { fill: this.itemColor })
        if (this.type === AStarItemType.Ground && !this.empty && this.value !== undefined){
            this.tshape.attr('style', { text: (this.value).toFixed(0) })
        }else{
            this.tshape.attr('style', { text:'' })
        }
    }
    setRate(rate: number, value?:number){
        if(this.type !== AStarItemType.Ground){
            throw new Error('item is not ground')
        }
        this.rate = rate
        this.value = value
        this.empty = false
        this.itemRefresh()
    }
    setEmpty(b: boolean) {
        this.empty = b
        if(!b){
            this.rate = 0
        } else {
            this.type = AStarItemType.Ground
        }
        this.itemRefresh()
    }
    setType(type: AStarItemType) {
        this.type = type
        this.itemRefresh()
    }
}

export type ControllerHooks = ElementEventName | 'mousedrag'
// [key in ...] 语法必须配合type 声明使用
export type Controller = {
    // click: (event: ElementEvent) => void,
    // mousemove: (event: ElementEvent) => void,

    [key in ControllerHooks]?: (event: ElementEvent) => void;
}


export class AStarCanvas {
    cfg: CanvasConfig
    zr: ZRenderType
    shapes: Array<ShapeItem> = []
    shapesCoord: Array<Array<ShapeItem>> = []
    controllerSet: Set<Controller> = new Set()
    mousedown = false
    sourceInfo?: {
        item: ShapeItem
        // x: number
        // y: number
        index: number
    }
    targetInfo?: {
        item: ShapeItem
        // x: number
        // y: number
        index: number
    }
    priorityGroup: Group = new Group({silent: true})

    constructor(dom: HTMLElement, cfg = {
        gep: 3,
        size: 15,
        shape: 'Circle',
    }) {
        const w = dom.clientWidth
        const h = dom.clientHeight
        this.cfg = {
            gep: cfg.gep,
            size: cfg.size,
            shape: cfg.shape,
            width: w,
            height: h,
            widthCnt: Math.floor(w / (cfg.gep + cfg.size)),
            heightCnt: Math.floor(h / (cfg.gep + cfg.size)),
        }
        this.zr = zrInit(dom)

        for(let y=0; y<this.cfg.heightCnt; y++) {
            const lastRow:Array<ShapeItem> = []
            this.shapesCoord.push(lastRow)
            for(let x=0; x<this.cfg.widthCnt; x++) {
                const item = new ShapeItem({ x, y }, this.cfg)
                this.shapes.push(item)
                lastRow.push(item)
                this.zr.add(item.zshape)
                this.priorityGroup.add(item.tshape)
            }
        }
        this.zr.add(this.priorityGroup)

        // this.zr.on('click', (e: ElementEvent) => {
        //     console.log('Event', e)
        // })
        this.registerControllerEvent('click')
        this.zr.on('mousedown', () => { 
            this.mousedown = true
        })
        this.zr.on('mousemove', (e:ElementEvent) => { 
            if(this.mousedown){
                this.controllerSet.forEach((v/* ,i,a */) => {
                    const cb = v['mousedrag']
                    cb && cb(e)
                })
            }
        })
        this.zr.on('mouseup',()=>{
            this.mousedown = false
        })
        // console.log('this.mapArr[0].emptyColor', this.shapes[0])
    }
    private registerControllerEvent(this: AStarCanvas, event: ElementEventName) { // ElementEventName
        const self = this
        this.zr.on(event, (e: ElementEvent) => {
            self.controllerSet.forEach((v/* ,i,a */) => {
                const cb = v[event] 
                cb && cb(e)
            })
        })
    }

    addController(controller: Controller) {
        this.controllerSet.add(controller)
    }
    removeController(controller: Controller) {
        this.controllerSet.delete(controller)
    }
    setWall(index:number){
        if(this.sourceInfo?.index === index){
            return
        }
        if(this.targetInfo?.index  === index){
            return
        }
        this.shapes[index].setType(AStarItemType.Wall)
    }
    setGround(index: number) {
        if (this.sourceInfo?.index === index) {
            return
        }
        if (this.targetInfo?.index === index) {
            return
        }
        this.shapes[index].setType(AStarItemType.Ground)
    }
    setSource(index:number){
        if(this.sourceInfo){
            this.sourceInfo.item.setEmpty(true)
        }
        this.shapes[index].setType(AStarItemType.Source)
        this.sourceInfo = {
            item: this.shapes[index],
            index,
        }
    }
    setTarget(index:number){
        if (this.targetInfo){
            this.targetInfo.item.setEmpty(true)
        }
        this.shapes[index].setType(AStarItemType.Target)
        this.targetInfo = {
            item: this.shapes[index],
            index,
        }
    }
    setRate(index: number, rate: number, value?: number) {
        this.shapes[index].setRate(rate, value)
    }

    destroy() {
        this.zr.dispose()
    }

    coord2point(coord: Coord) {
        const cfg = this.cfg
        const x = (cfg.gep + cfg.size) * coord.x + cfg.gep+ cfg.size / 2
        const y = (cfg.gep + cfg.size) * coord.y + cfg.gep+ cfg.size / 2

        return { x, y }

    }

    showPriority(show:boolean){
        if (show){
            this.priorityGroup.show()
        }else{
            this.priorityGroup.hide()
        }
    }
    // path
    path: Array<Coord> = []
    pathShape?: Group 
    drawPath(path: Array<Coord>) {
        const pathStyle = {
            stroke: '#1b2',
            lineWidth: 2,
        }
        if(path.length < 2){
            throw new Error('path is too short')
        }
        if (this.pathShape) {
            this.zr.remove(this.pathShape)
            this.pathShape = undefined
            this.path = []
        }
        let s = this.coord2point(path[0])
        this.path = path
        this.pathShape = new Group({
            silent: true,
        })
        for(let i=1; i<path.length; i++){
            const e = this.coord2point(path[i])
            const pathShape = {
                shape: {
                    x1: s.x,
                    y1: s.y,
                    x2:e.x,
                    y2 :e.y,
                },
                style: pathStyle,
                silent: true,
            }
            this.pathShape.add(new Line(pathShape))
            s = e
        }
        this.zr.add(this.pathShape)
    }

    clearRes(){
        this.shapes.forEach(shape=>{
            if(shape.type === AStarItemType.Ground){
                shape.setEmpty(true)
            }
        })
        if (this.pathShape) {
            this.zr.remove(this.pathShape)
            this.pathShape = undefined
            this.path = []
        }
    }
    clearAll() {
        this.shapes.forEach(shape => {
            shape.type = AStarItemType.Ground
            shape.setEmpty(true)
        })
        if (this.pathShape) {
            this.zr.remove(this.pathShape)
            this.pathShape = undefined
            this.path = []
        }

        this.sourceInfo = undefined
        this.targetInfo = undefined
    }
}


export class AStarItem{
    public gpriority?: number // 距离起点代价
    public hpriority?: number // 预估代价 曼哈顿距离
    // public fpriority?: number
    get fpriority(): number|undefined {
        if(this.gpriority===undefined || this.hpriority===undefined){
            return undefined
        }
        return this.gpriority + this.hpriority
    }
    public parent?: Coord
    constructor(
        public type: AStarItemType = AStarItemType.Ground,
    ){}
}

enum AStarState {
    Editing = 'Editing',
    Running = 'Running',
    Done = 'Done',
    Never = 'Never',
}

interface CoordItem extends Coord {
    item: AStarItem
}

abstract class AStarBase{
    width:number
    height:number
    mapArr: Array<Array<AStarItem>> = []
    openSet: { // 待遍历(已标注)节点
        [key: string]: AStarItem
    } = {}
    closeSet: { // 已遍历节点
        [key: string]: AStarItem
    } = {}
    openIndexList: string[] = [] // x-y // 待遍历节点排序的索引映射

    sourceInfo?:{
        item: AStarItem
        x: number
        y: number
        index: number
    }
    targetInfo?: {
        item: AStarItem
        x: number
        y: number
        index: number
    }

    state: AStarState = AStarState.Editing

    constructor(w:number,h:number){
        this.width = w
        this.height = h

        for (let y = 0; y < this.height; y++) {
            const lastRow: Array<AStarItem> = []
            this.mapArr.push(lastRow)
            for (let x = 0; x < this.width; x++) {
                const item = new AStarItem()
                // this.openSet[item.x + '-' + item.y] = item
                lastRow.push(item)
            }
        }
        this.state = AStarState.Editing
    }
    index2xy(index: number) {
        const x = index % this.width
        const y = Math.floor(index / this.width)
        return { x, y }
    }
    // getOpenListItem(index:number){
    //     const key = this.openIndexList[index]
    //     return key ? this.openSet[key] : null
    // }

    setWall(index: number){
        const {x,y} = this.index2xy(index)
        const item = this.mapArr[y][x]
        item.type = AStarItemType.Wall
        // item.fpriority = 
    }
    setGround(index: number){
        const {x,y} = this.index2xy(index)
        const item = this.mapArr[y][x]
        item.type = AStarItemType.Ground
        // item.fpriority = 
        
    }
    setSource(index: number){
        const {x,y} = this.index2xy(index)
        const item = this.mapArr[y][x]
        item.type = AStarItemType.Source
        // item.fpriority = 
        this.sourceInfo = {
            item,
            x,
            y,
            index,
        }
    }
    setTarget(index: number){
        const {x,y} = this.index2xy(index)
        const item = this.mapArr[y][x]
        item.type = AStarItemType.Target
        // item.fpriority = 
        this.targetInfo = {
            item,
            x,
            y,
            index,
        }
    }
    getItem(index: number){
        const {x,y} = this.index2xy(index)
        try{
            return {
                x,y,
                item: this.mapArr[y][x],
            }
        }catch{
            return undefined
        }
    }
    getItemCoord( coord: Coord ){
        if(coord.x>=this.width || coord.x<0 ||
            coord.y>=this.height || coord.y<0){
                return undefined
            }
        return this.mapArr[coord.y][coord.x]
    }
    openListGet(index:number){// 排序列表索引
        const key = this.openIndexList[index]
        if (key === undefined) {
            return undefined
        }
        const [x , y ] = key.split('-').map(v => Number(v))
        if (x === undefined || y === undefined) {
            return undefined
        }
        return {
            key,x,y,
            item: this.mapArr[y][x],
        }
    }
    coordTest(coord: Coord){
        return coord.x >= 0 && coord.x < this.width && coord.y >= 0 && coord.y < this.height
    }

    // 计算部分
    clearRes(){
        this.mapArr.forEach((row/* ,y */)=>{
            row.forEach((item/* ,x */)=>{
                item.gpriority = undefined
                item.hpriority = undefined
            })
        })
        this.openSet = { }
        this.openIndexList = []
        this.closeSet = {}
        this.state = AStarState.Editing
    }
    clearAll() {
        this.mapArr.forEach((row/* ,y */) => {
            row.forEach((item/* ,x */) => {
                item.type = AStarItemType.Ground
                item.gpriority = undefined
                item.hpriority = undefined
                item.parent = undefined
            })
        })
        this.openSet = {}
        this.openIndexList = []
        this.closeSet = {}
        this.state = AStarState.Editing

        this.sourceInfo = undefined
        this.targetInfo = undefined
    }

    abstract getDistance(source:Coord,target:Coord):number
    abstract gpMath(itemInfo: CoordItem, parentInfo: CoordItem,):number // priority 已消费代价
    abstract hpMath(itemInfo: CoordItem): number // priority 剩余预期代价
    abstract getChilds(x:number,y:number):Array<Coord>

    // https://stackoverflow.com/questions/44153378/typescript-abstract-optional-method
    /* abstract  */stepTest?(itemInfo: CoordItem, parentInfo: CoordItem,): void | {
        state: 'wall',
        item: AStarItem,
    }

    setItemPriority(itemCoord:Coord,parentInfo:{x:number,y:number,item: AStarItem}):{
        state:'over',
    } | {
        state: 'update' | 'have' | 'wall',
        item: AStarItem,
    } {
        if (!this.targetInfo) {
            throw new Error('targetInfo is undefined')
        }
        if (parentInfo.item.gpriority === undefined) {
            throw new Error('parentInfo.item.gpriority is undefined')
        }
        if (!this.coordTest(itemCoord)){
            return {
                state: 'over',
            }
        }
        const item = this.mapArr[itemCoord.y][itemCoord.x]
        if (item.type === AStarItemType.Wall) {
            return {
                state: 'wall',
                item: item,
            }
        }
        if (item.gpriority !== undefined) {
            return {
                state: 'have',
                item: item,
            }
        }
        const itemInfo = {
            item: item,
            ... itemCoord,
        }
        if( this.stepTest){
            const testRes = this.stepTest(itemInfo, parentInfo)
            if (testRes){
                return testRes
            }
        }
        item.gpriority = this.gpMath( itemInfo, parentInfo)
        item.hpriority = this.hpMath( itemInfo )
        item.parent = {
            x: parentInfo.x,
            y: parentInfo.y,
        }
        return {
            state: 'update',
            item: item,
        }
    }
    runInit() {
        if (!this.sourceInfo) {
            throw new Error('sourceInfo is undefined')
        }
        if (!this.targetInfo){
            throw new Error('targetInfo is undefined')
        }
        const key = this.sourceInfo.x + '-' + this.sourceInfo.y
        this.openSet = { [key]: this.sourceInfo.item }
        this.openIndexList = [key]
        this.closeSet = {}
        this.sourceInfo.item.hpriority = this.getDistance(this.sourceInfo, this.targetInfo)
        this.sourceInfo.item.gpriority = 0
        this.state = AStarState.Running
    }

    runStep(){ // 执行一步
        if(this.state == AStarState.Editing){
            this.runInit()
        }
        const itemInfo = this.openListGet(0) // 开集排序列表中代价最小的点
        if (!itemInfo) {
            this.state = AStarState.Never
            return {
                state: AStarState.Never,
            }
        }
        if (!this.targetInfo){
            throw new Error('targetInfo is undefined')
        }
        const {item,x,y} = itemInfo
        const childs = this.getChilds(x,y)

        let done = false
        const updateList: Array< Coord > = []
        childs.forEach(child => {
            const res = this.setItemPriority(child,{x,y,item}) // 新的可能点
            const key = child.x + '-' + child.y
            if (res.state === 'update' && !this.openSet[key]){
                let sotIndex:number|undefined = undefined
                this.openSet[key] = res.item
                for(let i=0 ; i<this.openIndexList.length ; i++){
                    const info = this.openListGet(i) // 排序列表里旧的数据
                    if (!info) continue
                    if (info.item.fpriority! > res.item.fpriority! ||  // 新的点总代价更小
                        Math.abs(info.item.fpriority! - res.item.fpriority!)<0.001 && info.item.gpriority! < res.item.gpriority!) { // 总代价相同,新的点移动步数更多
                        this.openIndexList.splice(i,0,key)
                        sotIndex = i
                        break
                    }
                }
                if (sotIndex === undefined) {
                    this.openIndexList.push(key)
                }
                updateList.push({x:child.x,y:child.y})
            }
            if (child.x == this.targetInfo!.x && child.y == this.targetInfo!.y) {
                done = true
            }
        })

        // close
        const key = x+'-'+y
        for(let i=0 ; i<this.openIndexList.length ; i++){
            if(this.openIndexList[i] === key){
                this.openIndexList.splice(i,1)
                break
            }
        }
        delete this.openSet[key]
        this.closeSet[key] = item

        this.state = done ? AStarState.Done : AStarState.Running
        return {
            stae: this.state,
            update: updateList,
            gpriority: item.gpriority! + 1,
        }
    }
    getPath(){
        if (!this.targetInfo){
            throw new Error('targetInfo is undefined')
        }
        if(this.state !== AStarState.Done){
            throw new Error('state is not Done')
        }
        const path: Array< Coord > = []
        let item = this.targetInfo.item
        path.push({ x:this.targetInfo.x, y:this.targetInfo.y })
        while(item.parent){
            path.push({x:item.parent.x,y:item.parent.y})
            item = this.mapArr[item.parent.y][item.parent.x]
        }
        path.reverse()
        return path
    }
}

export class AStarManhattan extends AStarBase{
    // 曼哈顿距离
    getDistance(source: Coord, target: Coord) {
        const res = Math.abs(target.x - source.x) + Math.abs(target.y - source.y)
        return res
    }
    gpMath(itemInfo: CoordItem, parentInfo: CoordItem,) { // priority 已消费代价
        return parentInfo.item.gpriority! + 1
    }
    hpMath(itemInfo: CoordItem) { // priority 剩余预期代价
        return this.getDistance(itemInfo, this.targetInfo!)
    }
    getChilds(x: number, y: number) {
        return [
            { x: x - 1, y: y },
            { x: x + 1, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },
        ]
    }
}

export class AStarDiagon extends AStarBase{

    // 对角距离
    getDistance(source: Coord, target: Coord) {
        const dx = Math.abs(target.x - source.x)
        const dy = Math.abs(target.y - source.y)
        const short = Math.min(dx , dy)
        const res = dx + dy + (Math.sqrt(2) - 2) * short
        return res
    }
    gpMath(itemInfo: CoordItem, parentInfo: CoordItem,) { // priority 已消费代价
        if (itemInfo.x == parentInfo.x || itemInfo.y == parentInfo.y){
            return 1 + parentInfo.item.gpriority!
        }
        return Math.sqrt(2) + parentInfo.item.gpriority!
    }
    hpMath(itemInfo: CoordItem) { // priority 剩余预期代价
        return this.getDistance(itemInfo, this.targetInfo!)
    }
    getChilds(x: number, y: number) {
        return [
            { x: x - 1, y: y },
            { x: x + 1, y: y },
            { x: x, y: y - 1 },
            { x: x, y: y + 1 },

            { x: x - 1, y: y-1 },
            { x: x + 1, y: y+1 },
            { x: x+1, y: y - 1 },
            { x: x-1, y: y + 1 },
        ]
    }
    stepTest(itemInfo: CoordItem, parentInfo: CoordItem,): void | {
        state: 'wall',
        item: AStarItem,
    } {
        if (itemInfo.x == parentInfo.x || itemInfo.y == parentInfo.y) {
            return
        }else{
            const point1 = this.getItemCoord({
                x:itemInfo.x,
                y:parentInfo.y,
            })
            const point2 = this.getItemCoord({
                x: parentInfo.x,
                y: itemInfo.y,
            })
            if (!point1 || !point2 || point1.type == AStarItemType.Wall && point2.type == AStarItemType.Wall){
                return {
                    state: 'wall',
                    item: itemInfo.item
                }
            }
        }
    }
}

class AStarDiagonShort extends AStarDiagon {
    setItemPriority(itemCoord: Coord, parentInfo: { x: number, y: number, item: AStarItem } ): {
        state: 'over',
    } | {
        state: 'update' | 'have' | 'wall',
        item: AStarItem,
    } {
        if (!this.targetInfo) {
            throw new Error('targetInfo is undefined')
        }
        if (!this.coordTest(itemCoord)) {
            return {
                state: 'over',
            }
        }
        const item = this.mapArr[itemCoord.y][itemCoord.x]
        if (item.type === AStarItemType.Wall) {
            return {
                state: 'wall',
                item: item,
            }
        }
        if (item.gpriority !== undefined) {
            return {
                state: 'have',
                item: item,
            }
        }
        const itemInfo = {
            item: item,
            ...itemCoord,
        }
        if (this.stepTest) {
            const testRes = this.stepTest(itemInfo, parentInfo)
            if (testRes) {
                return testRes
            }
        }
        // 循环次数会增加，如果更优解的位置是empty还没被计算的情况也是没办法的
        this.getChilds(itemCoord.x, itemCoord.y).forEach((coord:Coord)=>{
            const item = this.getItemCoord(coord)
            if (!item || item === parentInfo.item) return
            if (this.stepTest) {
                const testRes = this.stepTest(itemInfo, { item, ...coord })
                if (testRes) {
                    return testRes
                }
            }
            if (item.type == AStarItemType.Ground && item.gpriority! < parentInfo.item.gpriority!) {
                parentInfo = {
                    item,
                    ...coord
                }
            }
        })

        item.gpriority = this.gpMath(itemInfo, parentInfo)
        item.hpriority = this.hpMath(itemInfo)
        item.parent = {
            x: parentInfo.x,
            y: parentInfo.y,
        }
        return {
            state: 'update',
            item: item,
        }
    }
}

export class AStarRuntime{
    astar: AStarBase
    canvas: AStarCanvas

    constructor(dom: HTMLElement, cfg = {
        gep: 3,
        size: 15,
        shape: 'Circle',
        astar: AStarDiagonShort, // AStarDiagon, //AStarManhattan
    }) {
        this.canvas = new AStarCanvas(dom, cfg)
        const w = this.canvas.cfg.widthCnt
        const h = this.canvas.cfg.heightCnt
        this.astar = new cfg.astar(w,h)
    }
    get widthCnt(){
        return this.canvas.cfg.widthCnt
    }
    get heightCnt() {
        return this.canvas.cfg.heightCnt
    }

    addController(controller: Controller) {
        this.canvas.addController(controller)
    }
    removeController(controller: Controller) {
        this.canvas.removeController(controller)
    }

    getZshapeInfo(shape: Element){
        const match = this.canvas.shapes.findIndex(v => v.zshape.id === shape.id)
        if (match<1){
            return null
        }
        const x = match % this.widthCnt
        const y = Math.floor(match / this.widthCnt)
        return {
            index: match,
            x,
            y,
            astarItem: this.astar.mapArr[y][x],
            canvasItem: this.canvas.shapes[match],
        }
    }

    setWall(index:number){
        this.astar.setWall(index)
        this.canvas.setWall(index)
    }
    setGround(index: number){
        this.astar.setGround(index)
        this.canvas.setGround(index)
    }
    setSource(index: number) {
        this.astar.setSource(index)
        this.canvas.setSource(index)
    }
    setTarget(index: number) {
        this.astar.setTarget(index)
        this.canvas.setTarget(index)
    }

    gradientRow: Array<Array<Coord>> = []
    maxGpriority = 0
    run(){
        const update: Array<Array< Coord >> = []
        let lastArr: Array< Coord > = []
        let gpriority = 0
        for (; this.astar.state != AStarState.Done && this.astar.state != AStarState.Never ; ){
            const res = this.astar.runStep()
            if (res.update){
                if (res.gpriority != gpriority){
                    lastArr.length && update.push(lastArr)
                    lastArr = res.update.concat()
                    gpriority = res.gpriority!
                }else{
                    lastArr = lastArr.concat(res.update)
                }
            }
        }
        this.gradientRow = update
        this.maxGpriority = gpriority
    }
    * drawGradientRow(){
        for(let i =0 ; i<this.gradientRow.length ; i++){
            this.gradientRow[i].forEach(v => {
                const {x, y} = v
                const item = this.astar.mapArr[y][x]
                if (item.gpriority === undefined){
                    throw new Error('item.gpriority is undefined')
                }else{
                    if (item.type === AStarItemType.Ground){
                        this.canvas.setRate(x + y * this.widthCnt, item.gpriority! / this.maxGpriority, item.gpriority)
                    }
                }

            })
            yield this.gradientRow[i]
        }
    }
    drawPath(){
        if(this.astar.state === AStarState.Done){
            const path = this.astar.getPath()
            this.canvas.drawPath(path)
        }
    }


    clearRes(){
        this.canvas.clearRes()
        this.astar.clearRes()
    }
    clearAll() {
        this.canvas.clearAll()
        this.astar.clearAll()
    }

    destroy() {
        this.canvas.destroy()
    }
}