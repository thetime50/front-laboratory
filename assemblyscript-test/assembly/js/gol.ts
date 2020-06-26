import zrender from "zrender"
import * as math from "mathjs"
import buckets from "./mybuckets.js"

// 2020-06-26_2208

class CellClass {
    constructor(x, y,active = false) {
        this.x = x;
        this.y = y;
        this.constructor.zmaterialSync.call(this)
        this.set(active)
    }
    //实例方法??
    static zmaterialSync(){
        let zmaterial={
            shape: null,
            style: {
                fill: '#fbb',
                stroke: 'none'
            }
        }
        
        let opt = this.option
        let x=(opt.gep+opt.size)*this.x +opt.gep
        let y=(opt.gep+opt.size)*this.y +opt.gep
        let shape
        
        // console.log(this,this.option,opt.zr,opt.shape)
        switch(opt.shape){
            case "Rect":
                shape ={//圆型参数
                    x: x,
                    y: y,
                    r: opt.size*0.2,
                    width:opt.size,
                    height:opt.size,
                }
                break;
            case "Circle":
            default:
                shape ={//圆型参数
                    cx: x+opt.size/2,
                    cy: y+opt.size/2,
                    r: opt.size/2,
                }
                break;
        }
        zmaterial.shape=shape
        this.zmaterial = new zrender[opt.shape](zmaterial)
    }
    
    add(){
        // console.dir(this)//
        let opt= this.option
        if(!opt.zr){
            throw new error("plese call CellClass.initialize()")
        }
        opt.zr.add( this.zmaterial );
    }
    set(active){
        this.active=active
        this.refresh()
    }
    refresh(){
        this.active ? 
            this.zmaterial.attr('style',{fill:"#faa"}):
            this.zmaterial.attr('style',{fill:"#ddd"}) 
    }
    //类方法
    static setOption (opt){
        let checkSet = (attr,val)=>{
            opt[attr] && (this.prototype.option[attr]=val)
        }
        for (let index in opt){
            checkSet(index,opt[index])
        }
    }
    static initialize(dom){
        // console.dir(dom)
        let w = dom.clientWidth
        let h = dom.clientHeight
        let opt = this.prototype.option
        this.setOption({
            dom:dom,
            zr: zrender.init(dom),
            width: w,
            height: h,
            width_cnt: Math.floor(w/(opt.gep+opt.size)),
            height_cnt: Math.floor(h/(opt.gep+opt.size)),
        })
    }
    // static format(cb){
    static format(){
        let cb = (wi,hi)=>{
            let ca = new CellClass(wi,hi)
            ca.add(ca)
            return ca
        }
        let opt = this.prototype.option
        let wcnt = opt.width_cnt
        let hcnt = opt.height_cnt
        return Array.from({length:hcnt},(hv,hi)=>{
            return Array.from({length:wcnt},(wv,wi)=>{
                return cb(wi,hi)
            })
        })
    }
}
CellClass.prototype.option={
    dom:null,
    zr:null,
    width:100,
    height:100,
    width_cnt:10,
    height_cnt:10,
    
    gep:3,
    size:15,
    shape:'Circle',
}
// let cell = new CellClass()
// console.log(CellClass,CellClass.setOption)
// console.log(cell , cell.option)

/* life ****************************/

class Life2dClass{
    constructor(w, h, refresh) {
        this.w = w;
        this.h = h;
        this.loop = true
        // this.cells=math.ones(w, h).map((v,i,a)=>{
        //     return 
        // })
        this.random()
        this.refreshCb = refresh
        
        //logs
        this.logLength = 15
        //this.cellsArr=
        this.densitys=buckets.LinkedList()
        this.dfilters=buckets.LinkedList()//filter
        // this.dfilters delta
        this.refresh(this.cells,math.zeros([h,w]))
        // console.log(this)
        // let opt = this.option
    }
    random(){
        this.cells=math.randomInt([this.h,this.w],0,2)
    }
    updata(){
        // 人口过少：当周围低于2个（不包含2个）存活细胞时， 本单元活细胞死亡。
        // 稳定：当周围有2个或3个存活细胞时， 本单元细胞保持原样。
        // 人口过剩：当周围有3个以上的存活细胞时，本单元活细胞死亡。
        // 繁殖：当周围有3个存活细胞时，本单元细胞存活/活化。
        let density //= math.zeros(this.h,this.w)
        let after // = []
        
        let offsets=[
            [-1,-1],[0,-1],[1,-1],
            [-1,0] ,/*[0,0],*/[1,0],
            [-1,1] ,[0,1] ,[1,1],
        ]
        let normalTest = (v,min,max)=>{
            if(v>=max || v<min ){
                return -1
            }
            return v
        }
        let loopTest = (v,min,max)=>{
            if(v>=max){
                v-=(max-min)
            } else if(v<min ){
                v+=(max-min)
            }
            return v
        }
        let test = this.loop ? loopTest:normalTest
        density = math.map(this.cells,(cv,[cy,cx],ca)=>{
            let sum = offsets.reduce((t,[oy,ox],oi,oa)=>{
                let x = test(cx+ox,0,this.w)
                let y = test(cy+oy,0,this.h)
                if(x<0 || y<0){
                    return t
                }
                return t+math.subset(ca, math.index(y,x))
            },0)
            return sum
        })
        // 0,1 fales
        // 2 old
        // 3 true
        // >3 fales
        after = math.map(density,(v,[dy,dx],da)=>{
            let av
            switch(v){
                case 2: av=math.subset(this.cells, math.index(dy,dx)); break;
                case 3: av = true; break;
                default: av=false; break;
            }
            return av
        })
        // console.log(after, this.cells,density)
        // this.refresh(after, this.cells)
        this.cells = after
        this.refresh()
        this.logAdd(density)
    }
    // refresh(after,before){
        // let xor = math.matrix(math.xor(after,before))
        // xor.forEach((v,[y,x],a)=>{
        //     if(v){
        //         this.refreshCb(x,y,after[y][x])
        //     }
        // })
        // console.log(after,after.forEach)
    // }
    
    refresh(){
        math.forEach(this.cells,((v,[y,x],a)=>{
            this.refreshCb(x,y,v)
        }))
    }
    
    logAdd(density){
        let addLinked = (linked,item,length)=>{
            linked.add(item)
            let size = linked.size()
            if(size>length){
                linked.removeElementAtIndex(0)//(size-1)
            }
        }
        
        
        let fdensity,afterFdensity
        let fdsSize=this.dfilters.size()
        let wNew=0.4,wOld=1-wNew//Weight
        if(fdsSize == 0){
            fdensity = density
        }else{
            afterFdensity = this.dfilters.last()
            fdensity= math.add(
                math.multiply(afterFdensity,wOld),
                math.multiply(density,wNew)
            )
        }
        
        addLinked(this.densitys,density,this.logLength)
        addLinked(this.dfilters,fdensity,this.logLength)
    }
}

export {
    CellClass,
    Life2dClass,
}