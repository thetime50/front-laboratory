<template>
<div class="component-react-chart" v-resize:throttle="onResize">
    <div class="chart-ele" :class="{hidden:noData}" ref="chartEle"></div> <!-- v-show="!noData" -->
    <div class="major-no-data" v-if="noData"> <!-- mark-back -->
        <div>暂无数据</div>
    </div>
</div>
</template>

<script>
/* message */
import common from '@/js/common.js'
import "echarts-gl"
import echarts from 'echarts';//

export default {
    name: "react-chart",
    props:{
        data:{required:true,},//原始数据
        config:{type:Object,required:true,},//固定的初始化配置参数 传入后会被深拷贝 所以外部的config是可以复用的
        data_format:{type:Function,required:true,},//chart数据构造函数
        /*
        data_format(config,data,rcMeth){
            // config //内部用于图表绘制的配置 data_format内更新配置全都更新在这变量上，不要去更新外部的config
            // data,  //就是传入的data
            // rcMeth //常用的数据处理方法
            return{
                cancel:Boolean,//取消本次图表更新
                clear:Boolean,//清除数据重绘
            }
        }
        */
        initCb:{type:Function,},//(chart,vm)//用来注册点击事件等
    },
    data () {
        return {
            echart:null,
            chartConfig:this.getChartConfig(),
            formatRet:{},
            rcMeth:{
                limitTextWidth:this.limitTextWidth,
                getXaxis:   this.getXaxis,
                mapAttribute:this.mapAttribute,
                endZoom:    this.endZoom,
                zoomTo:     this.zoomTo,
                lazyZoom:   this.lazyZoom,
            }
        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.chartInit();
            this.dataRefresh();
        })
    },
    computed:{
        noData(){
            return this.formatRet.noData;
        },
    },
    methods:{
        onResize(...e){//内部触发的事件
            this.chartResize()
            this.$emit("resize",...e)
        },
        chartResize(){
            this.echart.resize()
        },
        chartClick(data){
            this.$emit('click', data);
        },
        chartInit(){
            this.echart=echarts.init(this.$refs.chartEle);
            this.echart.on("click", this.chartClick)
            this.initCb&&this.initCb(this.echart,this);//(chart,vm)
        },
        dataRefresh(){
            if(!this.echart){
                return
            }
            let ret=this.data_format(this.chartConfig,this.data,this.rcMeth);
            this.formatRet=ret||{}
            if(ret){
                if(ret.cancel){
                    return
                }
                if(ret.clear){
                    this.echart.clear();
                }
            }
            this.chartRefresh();
        },
        chartRefresh(){
            this.echart.setOption(this.chartConfig);
            this.$emit("refreshed",this.chartConfig)//para read only
        },

        getChartConfig(){
            return common.CloneDeepObj(this.config);
        },

        //export method
        limitTextWidth(str,tw){
            let s=""
            for(let i=0;i*tw<str.length;i++){
                s+=str.substr(i*tw,tw)
                if(i*tw+tw<str.length){
                    s+="\n"
                }
            }
            return s
        },
        //x轴自动填充到page count
        getXaxis(arr,pcnt,label,textw){
            let xa
            if(!label){
                xa = arr.map((v,i,a)=> i+1)
            }else if(typeof(label)=="string"){
                xa=arr.map((v,i,a)=> textw?this.limitTextWidth(v[label],textw):v[label])
            }else if(typeof(label)=="function"){
                xa=arr.map((v,i,a)=> {
                    return textw?this.limitTextWidth(label(v,i,a),textw):label(v,i,a)
                })
            }
            for(let i=arr.length; i<pcnt; i++){
                xa.push('')
            }
            return xa
        },
        mapAttribute(array,attribute,cb,origin=false){
            // cb(a,v,i,as){//attr val ind attrstr
            //     return number or {value, ... }
            // }
            let getValue=(v,i,a)=>{
                return (cb ? cb(v[a],v,i,a) : v[a])
            }
            let rarr=[]
            if(array){
                if(origin){
                    rarr=array.map((val,ind,arr)=>{
                        let ret=getValue(val,ind,attribute)
                        return (typeof(ret)!="object" ?
                            { value:ret, originData:val, }:
                            { ...ret, originData:val, }
                        )
                    })
                }else{
                    rarr=array.map((val,ind,arr)=>{
                        return getValue(val,ind,attribute)
                    })
                }
            }
            return rarr
        },
        // Zoom定位到末尾
        endZoom(dataLen,pageCnt){
            // return [startvalue,endvalue]
            return this.zoomTo(dataLen,pageCnt,dataLen)
        },

        zoomTo(dataLen,pageCnt,to){
            // return [startvalue,endvalue]
            if(dataLen<pageCnt){
                return [0,(pageCnt-1)];
            }else{
                if(to+pageCnt<dataLen){
                    return [to,to+pageCnt-1];
                }else{
                    return [dataLen-1-(pageCnt-1),dataLen-1];
                }
            }
        },
        lazyZoom(dataLen,pageCnt,st,to){
            //st: 当前起始位置
            //to: 跳转位置
            // return [startvalue,endvalue]
            if(to<st){
                return this.zoomTo(dataLen,pageCnt,to)
            }else if(to>=st+pageCnt){
                return this.zoomTo(dataLen,pageCnt,to-pageCnt+1)
            }else{
                return [st,st+pageCnt-1]
            }
        },

        //normal
        getEOption(){//注意在chartRefresh执行前数据可能和外部不一致
            return this.echart.getOption()
        },
        setZoom(s,e,ind=0){
            // console.log(s,e,ind)
            try {
                this.chartConfig.dataZoom[ind].startValue=s
                this.chartConfig.dataZoom[ind].endValue=e
                this.chartRefresh()
            } catch (error) {

            }
        },
        setZoomTo(to,dindex=0,zindex=0){//注意在chartRefresh执行前数据可能和外部不一致
            let eo=this.getEOption()
            let dataLen=eo.series[dindex].data.length
            let dz=eo.dataZoom[zindex]||eo.dataZoom
            let s=dz.startValue,e=dz.endValue
            let pageCnt=e-s+1
            let [ns,ne]=this.zoomTo(dataLen,pageCnt,to)
            this.setZoom(ns,ne,zindex)
        },
        setLazyZoom(to,dindex=0,zindex=0){//注意在chartRefresh执行前数据可能和外部不一致
            let eo=this.getEOption()
            let dataLen=eo.series[dindex].data.length
            let dz=eo.dataZoom[zindex]||eo.dataZoom
            let s=dz.startValue,e=dz.endValue
            let pageCnt=e-s+1
            let [ns,ne]=this.lazyZoom(dataLen,pageCnt,s,to)
            this.setZoom(ns,ne,zindex)
        },
    },
    watch:{
        data:{
            handler(after,before){
                this.dataRefresh();
            },
            deep:true,
            // immediate:true,
        },
        config:{
            handler(after,before){
                this.chartConfig=this.getChartConfig();
                this.dataRefresh();
            },
            deep:true,
        }
    },
    beforeDestroy () {
        if (this.echart) {
            echarts.dispose(this.echart);
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
.component-react-chart{
    width: 100%;
    height: 100%;
    position: relative;
    .chart-ele{
        width:100%;
        height: 100%;
    }
    .major-no-data{
        position: absolute;
        top: 0;
        width: 0;
        font-size: 20px;
        width:100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #c0c0c0;
    }
    .hidden{
        visibility: hidden;
    }
}
</style>
