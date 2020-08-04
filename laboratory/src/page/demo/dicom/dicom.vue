<template>
<div class="component-dicom flex-layout">
    <div class="three-wrap flex-auto" v-resize:throttle.50="onResize">
        
        <div class="three full-block" 
            ref="three"></div>
        <div class="opt-sw pabsolute" @click="optionSw = !optionSw">
            <i :class="optionSw?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
        </div>    
    </div>
    <transition name="option-wrap">
        <div class="option-wrap flex-none" v-if="optionSw">
            <!-- <div class="mask abs-full-block" v-if="!optionSw"></div> -->
            <el-form class="option" label-width="8rem">
                <div class="flex-layout frow">
                    <el-form-item class="flex-mean" label="单片">
                        <el-checkbox v-model="option.single">单片</el-checkbox>
                    </el-form-item>
                    <el-form-item class="flex-mean" label="动画">
                        <el-switch v-model="option.anime"/>
                    </el-form-item>
                    <div class="flex-mean align-self-center">
                        <el-button @click="visible = true" round size="mini">about</el-button>
                    </div>
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
    </transition>
    <el-dialog title="about"
        :visible.sync="visible">
        <p>
            虽然有完整的技术库解决方案，但是此Demo旨在自己组织技术栈，打通 文件-解析-数据加工-d3呈现 业务链。
        </p>
        <p>
            <a href="https://github.com/thetime50/front-laboratory/blob/master/doc/DICOM/README.md" 
                target="_blank"	>
                DICOM demo说明文档
            </a>
        </p>
        <p>
            demo示例文件下载 <br>
            (若文件名没有后缀请添加后缀.dcm) <br>
            <a href="https://github.com/FNNDSC/ami/blob/master/lessons/01/src/utils.js" target="_blank">
                示例文件来源
            </a>
        </p>
        <p>
            <template v-for="(item,index) in files" :href="files">
                <a :href="item" :download="fileNames[index]">
                    {{fileNames[index]}}
                </a>
                <br>
            </template>
        </p>
    </el-dialog>
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
            optionSw:true,
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

            //about
            visible:false,
            files,
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
        fileNames(){
            return this.files.map((v,i,a)=>{
                return v.match(/\d+$/)[0]+'.dcm'
            })
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
            if(this.option.anime){
                if(this.option.single){
                    this.option.singleIndex = after
                }else{
                    this.option.rangeIndex = [0,after]
                }
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
    .three-wrap{
        z-index: 10;
        .opt-sw{
            bottom: 10px;
            right: 10px;
            font-size: 30px;
            padding: 5px;
            border-radius: 5px;
            border: solid 1px #888;
            background-color: rgba(#fff,0.6);
            overflow: hidden;
        }
    }
    
    .option-wrap{
        position: relative;
        margin: 5px;
        border-radius: 5px;
        border: solid 1px #888;
        height: 200px;

        overflow: auto;
    }
    .option-wrap-enter-active, .option-wrap-leave-active {
        transition: all 0.5s;
    }
    .option-wrap-enter, .option-wrap-leave-to /* .fade-leave-active below version 2.1.8 */ {
        margin-top: 20px;
        height: 0px;//to
    }
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