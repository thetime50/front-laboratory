<template>
<div class="component-game-of-life">

  <div class="component-no1start">
    <div class="option">
        <el-form label-width="8rem">
          <el-form-item label="create at">
            {{createAt}} 
            {{wcnt}}*{{hcnt}}
            life:{{lifeCnt}}
<!--             aId:{{aId%1000}} -->
<!--            frameCnt:{{frameCnt}} -->
<!--               tTnterval:{{tInterval}} -->
           <el-button circle size="mini" type="primary" icon="el-icon-refresh" @click="random"></el-button>
           <el-button circle size="mini" type="primary" :icon="run?'el-icon-video-pause':'el-icon-video-play'" @click="run = !run"></el-button>
           <el-button circle size="mini" type="primary" icon="el-icon-arrow-right" title="next" v-if="!run" @click="next"></el-button>
           <el-button circle size="mini" type="primary" icon="el-icon-s-marketing" class="float-right" @click="drawer=true"></el-button>
           <el-button circle size="mini" type="primary" icon="el-icon-setting" class="float-right" @click="optDrawer=true"></el-button>
          </el-form-item>
        </el-form>
    </div>
      
    <div class="life" ref="life"></div>
      
    <el-drawer
      title="图表"
      :visible.sync="drawer"
      direction="rtl"
      :modal="false"
      :wrapperClosable="false"
      :size="drawerWidth"
      :custom-class=" 'opacity'+
          String(options.chartDrawOpacity).replace(/\./,'_')
       ">
<!--       :size="drawerWidth"> -->
      <div class="drawer-wrap">
            <div class="dtitle">
                密度图
            </div>
            <density class="dchart" :data="density"/>
            <div class="dtitle">
                密度图3d
            </div>
            <div class="dchart" ref="den"></div>
            <div class="dtitle">
                密度一阶滤波3d
            </div>
            <div class="dchart"  ref="fden"></div>
      </div>
    </el-drawer>
      
      
    <el-drawer
      title="设置"
      :visible.sync="optDrawer"
      direction="rtl"
      :modal="false"
      :wrapperClosable="false"
      :size="drawerWidth">
        <div class="seting-draw">
            <el-form label-width="8rem">
                <el-form-item label="chart opacity">
                <el-slider 
                    v-model="options.chartDrawOpacity"
                    :min="0.2"
                    :max="1"
                    :step="0.2"
                ></el-slider>
                </el-form-item>
                <el-form-item :label="'Speed:'+speed">
                <el-slider 
                    v-model="speed"
                    :min="0.1"
                    :max="1"
                    :step="0.01"
                ></el-slider>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</div>
</div>
</template>

<script>
/* message */
import moment from "moment"
import "echarts-gl"
import echarts from "echarts"
import * as math from "mathjs"
import {createWorker} from "@/js/worker.js"
import{
    CellClass,
    Life2dClass,
}from "./gol.js"

import {
    getBrowserInfo,
    getBrowserCore,
} from "@/js/nativetool.js"

import density from "@/components/gameoflife/density.vue"

export default {
    name: "game-of-life",
    components:{
        density,
    },
    data () {
        return {
            windowWidth:100,
            
            aId:0,
            wcnt:0,
            hcnt:0,
            createAt:moment().format('hh:mm:ss'),
            
            speed:0.8,
            startStamp:0,
            frameCnt:0,
            run:true,
            
            /* history chart ************/
            drawer:false,
            _denChart:null,
            _fdenChart:null,
            
            isLife:true,
            lifeCnt:0,
            lifeInterval:10,
            lifeMax:[],
            lifeDelta:[],
            lifeThred:0.01,
            
            optDrawer:false,
            options:{
                chartDrawOpacity:0.6,
            },

            _cell2d:null,
            _life2d:null,

            density:[],
        };
    },
    created(){
        // console.log("*",getBrowserInfo(),getBrowserCore())
    },
    mounted(){
        // 自动刷新
        // 好像没啥用
        // console.log(/\/(full|fullpage)\//.test(location.pathname),location.pathname)

        if(getBrowserCore().indexOf("Internet Explorer")>=0){
            alert("请使用谷歌浏览器或使用chrome内核！！")
            return
        }

        if(/\/(full|fullpage)\//.test(location.pathname)){
            setInterval(()=>{
                console.log("reload",location.reload)
                // 全部不行
                // https://blog.codepen.io/documentation/referred-from-pen-message/
                // history.go(0) //
                // location.reload() 
                // location=location 
                // location.assign(location) 
                // document.execCommand('Refresh') 
                // window.navigate(location) 
                // location.replace(location) 
                // document.URL=location.href
            },6000)
            // },1*60*1000)
        }
        
        this.$nextTick(()=>{
            this.windowWidth=window.innerWidth
            CellClass.initialize(this.$refs.life)
            this._cell2d = CellClass.format()
            console.dir(CellClass.prototype.option)
            // console.log(this._cell2d)
            this.wcnt=CellClass.prototype.option.width_cnt
            this.hcnt=CellClass.prototype.option.height_cnt
            this.life2dInit()
            
            this.startStamp = (new Date()).getTime()
            this.animation()
        })
    },
    beforeDestroy(){
        cancelAnimationFrame(this.aId) 
    },
    computed:{
        tInterval(){
            return Math.floor((1.01-this.speed)*1000)
        },
        drawerWidth(){
            // let width = Math.max(300,this.windowWidth*0.35)
            // width = Math.min(width,this.windowWidth*0.8)
            // return Math.floor(width).toString()
            let width= '35%'
            if(300>this.windowWidth*0.35){
                width="75%"
            }
            return width
        },
    },
    methods:{
        /** game of life ***************************************************/
        life2dInit(){
            this._life2d = new Life2dClass(this.wcnt,this.hcnt,(x,y,v)=>{
                this._cell2d[y][x].set(v)
            })
        },
        refresh(){
            this._life2d.refresh()
        },
        next(){
            this._life2d.updata()
            this.chartRefresh()
            this.checkLife()
        },
        random(){
            this._life2d.random()
            // this.chartInit()
            this.checkLiveInit()
        },
        getDelta(){
            return (new Date()).getTime() - this.startStamp
        },
        checkRefresh(){
            let frameCnt=Math.floor( this.getDelta()/this.tInterval)
            if(!this.run){
                this.frameCnt = frameCnt
                return false
            }
            if(this.frameCnt != frameCnt){
                this.frameCnt = frameCnt
                return true
            }
            return false
        },
        animationRAF(){
            this.aId=requestAnimationFrame(this.animation)
            if(this.checkRefresh()){
                this.next()
            }
        },
        animationTO(){
            setTimeout(this.animationTO,this.tInterval)
            this.next()
        },
        animation() {
            // Do whatever
            
            // this._life2d.updata()
            // return
            // Do something animate
            this.animationRAF()
            // this.animationTO()
        },
        
        /* check life **/
        checkLiveInit(){
            this.isLife=true
            this.lifeCnt=0
            this.lifeMax=[]
            this.lifeDelta=[]
        },
        checkLife(){
            this.lifeCnt+=1
            if(this.lifeCnt%this.lifeInterval==1){
                //current max || delta
                let interval=Math.min(this._life2d.logLength-1,this.lifeInterval)
                let dmax=math.max(this._life2d.densitys.last())
                let dFilterDelta = 10000
                if(this._life2d.dfilters.size()>interval){
                    // dFilterDelta = math.mean(math.abs(math.subtract(
                    //     this._life2d.densitys.last(),
                    //     this._life2d.dfilters.elementAtIndex(
                    //         this._life2d.dfilters.size()-1-interval
                    //     )
                    // )))
                    let dflast =this._life2d.dfilters.last()
                    let dfinte = this._life2d.dfilters.elementAtIndex(
                        this._life2d.dfilters.size()-1-interval
                    )
                    let cnt=0
                    let sum=0
                    dflast.forEach((d0v,d0i)=>{
                        d0v.forEach((d1v,d1i)=>{
                            let vlast=d1v,vinte=dfinte[d0i][d1i]
                            let delta = Math.abs(vlast-vinte)
                            if(delta > this.lifeThred){
                                cnt++
                                sum+=delta
                            }
                        })
                    })
                    dFilterDelta=sum
                }
                this.lifeMax.push(dmax)
                this.lifeDelta.push(dFilterDelta)
                if(dFilterDelta<1 ){
                    this.isLife=false
                    //
                    this.random()
                }
                // console.log(dmax,dFilterDelta)
            }
        },
        
        /* history chart ************/
        chartInit(){
           this._denChart=this.init3dChart(this.$refs.den)
           this._fdenChart=this.init3dChart(this.$refs.fden)
            
           this.chartRefresh()
        },
        chartClean(){
           this._denChart=null
           this._fdenChart=null
        },
        chartRefresh(){
            this._denChart && this.setChartData(this._denChart,this._life2d.densitys)
            this._fdenChart && this.setChartData(this._fdenChart,this._life2d.dfilters)
            this.density = this._life2d.densitys.last()
        },
        
        init3dChart(dom){
            let opt = this.getChartOption()
            let proportion = Math.min(90/this.wcnt,90/this.hcnt)
            opt.grid3D.boxWidth=this.wcnt*proportion
            opt.grid3D.boxHeight=this.hcnt*proportion
            opt.grid3D.boxDepth=110
            let cht = echarts.init(dom);
            cht.setOption(opt);//ECharts 会合并新的参数和数据
            return cht
        },
        setChartData(cht,data){
            let data3d = data.toArray()
            let data2cdata = function (e){
                let data3d = e.data
                let cdata=[]
                data3d.forEach((d0v,d0i,d0a)=>{
                    d0v.forEach((d1v,d1i,d1a)=>{
                        d1v.forEach((d2v,d2i,d2a)=>{
                            // cdata.push([d0i,d1i,d2i,d2v])
                            cdata.push([d2i,d0a.length-d0i-1,d1a.length-d1i-1,d2v])
                        })
                    })
                })
                // return cdata
                self.postMessage(cdata)
                // self.close()
            }
            let data2cdataWorker = createWorker(data2cdata)
            data2cdataWorker.onmessage = function (e) {
                let cdata = e.data
                // render data
                let opt={
                    series:[{
                            data:cdata,
                    }],
                }
                cht.setOption(opt);//ECharts 会合并新的参数和数据
                data2cdataWorker.terminate()//要记得终止进程释放资源
            }
            data2cdataWorker.postMessage(data3d);
        },
        getChartOption(){//(cdata){
            return {
                visualMap: {
                    show: false,
                    min: 0,
                    max: 8,
                    inRange: {
                        symbolSize: [0.5, 25],
                        color: ['#313695', '#4575b4', '#74add1', 
                                '#abd9e9', '#e0f3f8', '#ffffbf', 
                                '#fee090', '#fdae61', '#f46d43', 
                                '#d73027', '#a50026'],
                        colorAlpha: [0.02, 0.95]
                    }
                },
                xAxis3D: {
                    type: 'value',
                    name:'X',
                },
                yAxis3D: {
                    type: 'value',
                    name:'t',
                },
                zAxis3D: {
                    type: 'value',
                    name: 'Y',
                },
                grid3D: {
                    axisLine: {
                        lineStyle: { color: '#fff' }
                    },
                    axisPointer: {
                        lineStyle: { color: '#fff' }
                    },
                    viewControl: {
                        // autoRotate: true
                    }
                },
                series: [{
                    type: 'scatter3D',
                    data: [],//cdata,
                }]
            }
        },
    },
    watch:{
        drawer(befare,after){
            if(befare){
                this.$nextTick(()=>{
                    this.chartInit()
                })
            }else{
                this.chartClean()
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-game-of-life{

    .component-no1start{
        height: 100%;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;//.class1 .class2
         >*{
            min-width: 0;
            min-height: 0;
        }
        .option{
            max-width: calc(100% - 3rem);
            @media (min-width: 43rem){
                width:40rem;
            }
        }
        .life{
             // height: 100%;
        }
    }
    v-deep{
        .el-drawer{
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;//.class1 .class2
            >*{
                min-width: 0;
                min-height: 0;
            }
            .el-drawer__header{
                padding-top: 10px;
                margin-bottom: 10px;
            }
        }
    }
    .drawer-wrap{
        width:100%;
        height:100%;
        overflow-y:auto;
        .dchart{
            height:250px;
            background-color: #666;
        }
    }
    .seting-draw{
        padding-right: 15px;
    }
    v-deep{
        .opacity0_2{
            opacity: 0.2
        }
        .opacity0_4{
            opacity: 0.4
        }
        .opacity0_6{
            opacity: 0.6
        }
        .opacity0_8{
            opacity: 0.8
        }
        .opacity1{
            opacity: 1
        }
    }
    
    .float-right{
        float: right;
    }
}
</style>