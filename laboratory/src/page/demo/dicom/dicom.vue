<template>
<div class="component-dicom flex-layout">
    <div class="three-wrap flex-auto" v-resize:throttle="onResize">
        
        <div class="three full-block" 
            ref="three"></div>    
    </div>
    <el-form class="opration flex-none" label-width="8rem">
        <el-form-item label="单片">
            <el-checkbox v-model="opration.single">单片</el-checkbox>
        </el-form-item>
        <el-form-item label="序列" v-if="opration.single">
            <el-slider v-model="opration.singleIndex" :min='0' :max="dtPara.fileCnt"/>
        </el-form-item>
        <el-form-item label="序列" v-else>
            <el-slider v-model="opration.rangeIndex" :min='0' :max="dtPara.fileCnt" range/>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
/* message */
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
            opration:{
                single:false,
                singleIndex:0,//对应数组索引 不是数据内的number
                rangeIndex:[0,0],
            },

            _dt:null,
            dtPara:{
                fileCnt:0,
            },
        };
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
    },
    computed:{
        showRange(){
            let opt = this.opration
            return opt.single ? [opt.singleIndex,opt.singleIndex] : opt.rangeIndex
        },
    },
    methods:{
        onResize(){
            this._dt && this._dt.renderFun()
        },
    },
    watch:{
        showRange(after,before){
            this._dt && this._dt.setMeshs(after,true)
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dicom{
    position: relative;
}
</style>