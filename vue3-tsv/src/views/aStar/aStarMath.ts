import { init as zrInit, ZRenderType, Circle, Rect, color, Element } from "zrender"

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

class ShapeItem {
    zshape: Circle | Rect
    rate = 0
    empty = true
    emptyColor= "#eee"
    groundColor = '#333'
    itemColor:string
    type: AStarItemType

    constructor( public coord: Coord, cfg: CanvasConfig) {
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
        const light = this.rangeTrans(this.rate, 0, 1, 95, 60)
        return `hsl(${hue},100%,${light}%)`
    }
    getItemColor(){
        if (this.type === AStarItemType.Wall){
            return this.groundColor
        }else if(this.empty){
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
        this.rate = rate
        this.empty = false
        this.itemRefresh()
    }
    setEmpty(b: boolean) {
        this.empty = b
        // if(!b){
        //     this.rate = 0
        // }
        this.itemRefresh()
    }

}

export class AStarCanvas {
    cfg: CanvasConfig
    zr: ZRenderType
    shapes: Array<ShapeItem> = []
    shapesCoord: Array<Array<ShapeItem>> = []

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
    }
    destroy() {
        this.zr.dispose()
    }
}


export class AStarItem{
    constructor(
        public x: number,
        public y: number,
        public fpriority: number,
        // public gpriority: number,
        // public hpriority: number,
        public type: AStarItemType = AStarItemType.Ground,
    ){}
}

export class AStar{
    width:number
    height:number
    mapArr: Array<Array<AStarItem>> = []
    openSet: {
        [key: string]: AStarItem
    } = {}
    closeSet: {
        [key: string]: AStarItem
    } = {}
    constructor(w:number,h:number){
        this.width = w
        this.height = h

        for (let y = 0; y < this.height; y++) {
            const lastRow: Array<AStarItem> = []
            this.mapArr.push(lastRow)
            for (let x = 0; x < this.width; x++) {
                const item = new AStarItem(x,y,0)
                this.openSet[item.x + '-' + item.y] = item
                lastRow.push(item)
            }
        }
    }
    get openList(){
        return Object.keys(this.openSet).map(item => this.openSet[item])
    }
    get closeList(){
        return Object.keys(this.closeSet).map(item => this.closeSet[item])
    }
    fpMath(item: AStarItem){ // priority
        return this.gpMath(item) + this.hpMath(item)
    }
    gpMath(item: AStarItem){ // priority
        return 0
    }
    hpMath(item: AStarItem){ // priority
        return 0
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

    destroy() {
        this.canvas.destroy()
    }
}