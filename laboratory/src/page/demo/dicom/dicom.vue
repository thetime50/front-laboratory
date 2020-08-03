<template>
<div class="component-dicom flex-layout">
    <!-- <el-form class="flex-none">
        <el-form-item label="">
           
        </el-form-item>
        
    </el-form> -->
    <div class="three-wrap flex-auto" v-resize:throttle="onResize">
        
        <div class="three full-block" 
            ref="three"></div>    
    </div>
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
            renderFun:null,
            para:{
                // 
            },
            elList:[
                {val:40},
                {val:80},
                {val:120},
            ],

            _dt:null,
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
        // 
    },
    methods:{
        onResize(){
            this._dt && this._dt.renderFun()
        },
    },
    watch:{
        para:{
            handler(after,before){
                this.init()
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
}
</style>