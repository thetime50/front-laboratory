<template>
<div class="component-dicom flex-layout">
    <div class="three-wrap flex-auto" v-resize:throttle="onResize">
        
        <div class="three full-block" 
            ref="three"></div>    
    </div>
    <el-form class="option flex-none" label-width="8rem">
        <div class="flex-layout frow">
            <el-form-item class="flex-meth" label="单片">
                <el-checkbox v-model="option.single">单片</el-checkbox>
            </el-form-item>
            <el-form-item class="flex-meth" label="动画">
                <el-switch v-model="option.anime"/>
            </el-form-item>

        </div>
        <el-form-item label="序列" v-if="option.single">
            <el-slider v-model="option.singleIndex" :min="0" :max="dtPara.fileCnt"/>
        </el-form-item>
        <el-form-item label="序列" v-else>
            <el-slider v-model="option.rangeIndex" :min="0" :max="dtPara.fileCnt" range/>
        </el-form-item>
        <el-form-item label="透明">
            <el-checkbox v-model="option.transparency">透明</el-checkbox>
        </el-form-item>
        <el-form-item label="Hu 范围">
            <el-input class="num-patch" v-model="option.huRange[0]" type="number" 
                :min="0" :max="option.huRange[1]"></el-input>
            <el-input class="num-patch" v-model="option.huRange[1]" type="number" 
                :min="option.huRange[0]" :max="65535"></el-input>
        </el-form-item>
        <el-form-item label="Hu">
            <el-slider v-model="option.hounsfieldUnit" :min="option.huRange[0]" :max="option.huRange[1]" range
                :marks="huMarks"/>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
/* message */
import {
    throttle, //第一次就立即触发
    debounce, //第一次不触发
} from 'throttle-debounce' //现在有重复触发现象 先不修改 用消抖处理一下
import * as threeTool from "@/js/three/threeTool.js"
import anime from "animejs"
import * as AMI from "ami.js"
import { colors, files } from '@/page/ami/amiStart/utils.js';

import DicomThree from "./DicomThree.js"
import {
    imageThreeTest,
    AMI2ImgTest,
} from "./dicomDbg.js"

export default {
    name: "dicom",
    data () {
        return {
            option:{
                single:false,
                singleIndex:0,//对应数组索引 不是数据内的number
                rangeIndex:[0,0],
                transparency:true,
                anime:false,
                huRange:[0,1000],
                hounsfieldUnit:[200,455],
            },

            danime:{
                index:0,
            },

            _dt:null,
            dtPara:{
                fileCnt:0,
            },

            _huRangeDebounce:null,
        };
    },
    created(){
        this._huRangeDebounce = debounce(200,this.setHuRange)
    },
    mounted(){
        this.$nextTick(async ()=>{
            // anime({
            //     // 
            // });

            await imageThreeTest.call(this)
            // AMI2ImgTest.call(this)
        })
    },
    beforedestory(){
        // anime.remove(this.elList)
        this.setIndexAnime(false)
        this._huRangeDebounce && this._huRangeDebounce.cancel()
    },
    computed:{
        showRange(){
            let opt = this.option
            return opt.single ? [opt.singleIndex,opt.singleIndex] : opt.rangeIndex
        },
        huMarks(){
            return {
                [this.option.huRange[0]]: this.option.huRange[0]+' Hu',
                [this.option.huRange[1]]: this.option.huRange[1]+' Hu',
            }
        },
    },
    methods:{
        onResize(){
            this._dt && this._dt.renderFun()
        },
        setIndexAnime(sw){
            if(sw){
                anime({
                    targets: this.danime,//fromindex

                    index:this.dtPara.fileCnt,//to
                    round: 1,
                    duration:this.dtPara.fileCnt *120,
                    easing: 'linear',
                    endDelay:300,
                    direction: 'normal',
                    loop: true,
                })
            }else{
                anime.remove(this.danime)
                this.danime.index = 0
            }
        },
        setHuRange(range){
            this._dt && this._dt.setHuRange(range)
        },
    },
    watch:{
        showRange(after,before){
            this._dt && this._dt.setMeshs(after,true)
        },
        'option.transparency'(after,before){
            this._dt && this._dt.setTransparency(after)
        },
        "option.anime"(after,before){
            this.setIndexAnime(after)
        },
        "danime.index"(after,before){
            if(this.option.single){
                this.option.singleIndex = after
            }else{
                this.option.rangeIndex = [0,after]
            }
        },
        "option.hounsfieldUnit"(after,before){
            this._huRangeDebounce && this._huRangeDebounce(after)
        },
        "option.huRange":{
            handler(after,before){
        
            },
            deep:true,
            // immediate:true,
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dicom{
    position: relative;
    .option{
        max-width: calc(100% - 3rem);
        @media (min-width: 43rem){
          width:40rem;
        }
        /deep/ .el-slider__marks-text{
            width: 80px;
        }
        .el-input{
            width: 150px;
        }
    }
}
</style>