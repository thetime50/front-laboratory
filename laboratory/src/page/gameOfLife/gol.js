import zrender from "zrender"
import {
    Life2d3x3Class,
    Life2dMatrixClass,
} from "./life2dMath.js"

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

// let Life2dClass = Life2d3x3Class
let Life2dClass = Life2dMatrixClass

export {
    CellClass,
    Life2dClass,
}