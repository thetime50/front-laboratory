import { init as zrInit, ZRenderType, Circle, Rect, Line, Group, Element, ElementEvent, } from "zrender"
import { ElementEventName } from 'zrender/lib/core/types';

interface Point{ // 绘图位置
    x:number,
    y:number
}
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
    return ((target: any, key: string, desc:PropertyDecorator) => {
        target[key] = value;
    });
}
// Object.defineProperty(ShapeItem.prototype, 'emptyColor = "#eee" })
// Object.defineProperty(ShapeItem.prototype, 'groundColor = '#333' })
// Object.defineProperty(ShapeItem.prototype, 'sourceColor = 'hsl(240,100%,55%)' })
// Object.defineProperty(ShapeItem.prototype, 'targetColor = 'hsl(0,100%,55%)' })
class ShapeItem {
    zshape: Circle | Rect
    rate = 0
    empty = true // if type is Ground
    itemColor:string
    type: AStarItemType

    @protoAttr("#eee")
    emptyColor: string // 这样鞋依然会在初始化时被赋值实例属性undefined
    @protoAttr("#333")
    groundColor: string
    @protoAttr("hsl(240,100%,55%)")
    sourceColor: string
    @protoAttr("hsl(0,100%,55%)")
    targetColor: string

    constructor(public coord: Coord, cfg: CanvasConfig) {
        if (Object.prototype.hasOwnProperty.call(this, 'emptyColor')) {
            delete this.emptyColor  // eslint-disable-line
        }
        if (Object.prototype.hasOwnProperty.call(this, 'groundColor')) {
            delete this.groundColor  // eslint-disable-line
        }
        if (Object.prototype.hasOwnProperty.call(this, 'sourceColor')) {
            delete this.sourceColor  // eslint-disable-line
        }
        if (Object.prototype.hasOwnProperty.call(this, 'targetColor')) {
            delete this.targetColor  // eslint-disable-line
        }

        this.rate = 0
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
        this.itemColor = this.getItemColor()
        this.zshape.attr('style', { fill: this.itemColor })
    }
    setRage(rate: number){
        if(this.type !== AStarItemType.Ground){
            throw new Error('item is not ground')
        }
        this.rate = rate
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
            }
        }

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
        this.shapes[index].setType(AStarItemType.Wall)
    }
    setGround(index: number) {
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
    setRate(index: number, rate: number) {
        this.shapes[index].setRage(rate)
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
        this.pathShape = new Group()
        for(let i=1; i<path.length; i++){
            const e = this.coord2point(path[i])
            const pathShape = {
                shape: {
                    x1: s.x,
                    y1: s.y,
                    x2:e.x,
                    y2 :e.y,
                },
                style: pathStyle
            }
            this.pathShape.add(new Line(pathShape))
            s = e
        }
        this.zr.add(this.pathShape)
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

export class AStar{
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

    gpMath(item: AStarItem){ // priority
        return 0
    }
    hpMath(item: AStarItem){ // priority
        return 0
    }
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
    cleanPriority(){
        this.mapArr.forEach((row/* ,y */)=>{
            row.forEach((item/* ,x */)=>{
                item.gpriority = undefined
                item.hpriority = undefined
            })
        })
    }

    // 曼哈顿距离
    getHPriority(source:Coord,target:Coord) {
        const res = Math.abs(target.x - source. x) + Math.abs(target.y - source.y)
        return res
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
        item.hpriority = this.getHPriority(itemCoord,this.targetInfo)
        item.gpriority = parentInfo.item.gpriority + 1
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
        this.sourceInfo.item.hpriority = this.getHPriority(this.sourceInfo, this.targetInfo)
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
        const childs = [
            {x:x-1,y:y},
            {x:x+1,y:y},
            {x:x,y:y-1},
            {x:x,y:y+1},
        ]
        let close = true
        let done = false
        const updateList: Array< Coord > = []
        childs.forEach(child => {
            const res = this.setItemPriority(child,{x,y,item})
            if(res.state === 'update'){
                let sotIndex:number|undefined = undefined
                close = false
                this.openSet[child.x + '-' + child.y] = res.item
                const key = child.x + '-' + child.y
                for(let i=0 ; i<this.openIndexList.length ; i++){
                    const info = this.openListGet(i)
                    if (!info) continue
                    if (info.item.fpriority! > res.item.fpriority!) {
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
        if (close) {
            const key = x+'-'+y
            for(let i=0 ; i<this.openIndexList.length ; i++){
                if(this.openIndexList[i] === key){
                    this.openIndexList.splice(i,1)
                    break
                }
            }
            delete this.openSet[key]
            this.closeSet[key] = item
        }
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

export class AStarRuntime{
    astar: AStar
    canvas: AStarCanvas

    constructor(dom: HTMLElement, cfg = {
        gep: 3,
        size: 15,
        shape: 'Circle',
    }) {
        this.canvas = new AStarCanvas(dom, cfg)
        const w = this.canvas.cfg.widthCnt
        const h = this.canvas.cfg.heightCnt
        this.astar = new AStar(w,h)
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
                        this.canvas.setRate(x+y*this.widthCnt,item.gpriority! / this.maxGpriority)
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

    destroy() {
        this.canvas.destroy()
    }
}