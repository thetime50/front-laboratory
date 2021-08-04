import * as math from "mathjs"
import buckets from "./mybuckets.js"
/* life ****************************/

class Life2d3x3Class{
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
    _densityComputer(cells,w,h,loop){
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
        let test = loop ? loopTest:normalTest
        let density = math.map(cells,(cv,[cy,cx],ca)=>{
            let sum = offsets.reduce((t,[oy,ox],oi,oa)=>{
                let x = test(cx+ox,0,w)
                let y = test(cy+oy,0,h)
                if(x<0 || y<0){
                    return t
                }
                return t+math.subset(ca, math.index(y,x))
            },0)
            return sum
        })
        return density
    }
    updata(){
        // 人口过少：当周围低于2个（不包含2个）存活细胞时， 本单元活细胞死亡。
        // 稳定：当周围有2个或3个存活细胞时， 本单元细胞保持原样。
        // 人口过剩：当周围有3个以上的存活细胞时，本单元活细胞死亡。
        // 繁殖：当周围有3个存活细胞时，本单元细胞存活/活化。
        let density //= math.zeros(this.h,this.w)
        let after // = []

        let timestamp=[]
        timestamp[0]=(new Date()).getTime()
        density = this._densityComputer(this.cells,this.w,this.h,this.loop)
        timestamp[1]=(new Date()).getTime()
        // 0,1 fales
        // 2 old
        // 3 true
        // >3 fales
        after = math.map(density,(v,[dy,dx],da)=>{
            let av
            switch(v){
                case 2: av=this.cells[dy][dx]; break;
                case 3: av = true; break;
                default: av=false; break;
            }
            return av
        })
        timestamp[2]=(new Date()).getTime()
        // console.log(after, this.cells,density)
        if(true){
            this.xorRefresh(after, this.cells)
            this.cells = after
        }else{
            this.cells = after
            this.refresh()
        }
        timestamp[3]=(new Date()).getTime()
        // console.log(
        //     "gol computed",'密度 life draw',
        //     timestamp[1]-timestamp[0],
        //     timestamp[2]-timestamp[1],
        //     timestamp[3]-timestamp[2],
        // )//密度计算比较花时间啊
        this.logAdd(density)
    }
    xorRefresh(after,before){
        let xor = math.matrix(math.xor(after,before))
        xor.forEach((v,[y,x],a)=>{
            if(v){
                this.refreshCb(x,y,after[y][x])
            }
        })
        // console.log(after,after.forEach)
    }
    
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

class Life2dMatrixClass extends Life2d3x3Class{
    _densityComputer(cells,w,h,loop){
        //上下左右
        let density = math.zeros(h,w) 
        let opt
        let range=(start,end)=>{
            return Array.from({length:end-start},(v,i)=>start+i)
        }
        let yindex = range(0,h)
        let xindex = range(0,w)
        let tdIndex =range(0,h-1)
        tdIndex.unshift(h-1)
        let tuIndex =range(1,h)
        tuIndex.push(0)
        let trIndex =range(0,w-1)
        trIndex.unshift(w-1)
        let tlIndex =range(1,w)
        tlIndex.push(0)
        
        // console.log(math.size(cells),math.size(density),yindex,tdIndex)
        opt = math.subset(cells,math.index(tdIndex,xindex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(tuIndex,xindex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(yindex,trIndex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(yindex,tlIndex))//down
        density = math.add(density,opt)


        opt = math.subset(cells,math.index(tdIndex,trIndex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(tuIndex,tlIndex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(tdIndex,tlIndex))//down
        density = math.add(density,opt)
        opt = math.subset(cells,math.index(tuIndex,trIndex))//down
        density = math.add(density,opt)

        // console.log(cells,density, opt)

        // let test = loop ? loopTest:normalTest

        return density._data
    }
}

export {
    Life2d3x3Class,
    Life2dMatrixClass,
}