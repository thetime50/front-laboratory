<template>
<div class="component-cv-start">

  <div class="inputoutput">
    <img ref="imageSrc" alt="No Image" @load="imgLoad"/>
    <div class="caption">
        imageSrc <input type="file" name="file" @change="fileChange"/>
    </div>
  </div>
  <div class="inputoutput">
    <canvas ref="canvasOutput" ></canvas>
    <div class="caption">canvasOutput</div>
  </div>
</div>
</template>

<script>
/* message */
// https://docs.opencv.org/3.4/d0/d84/tutorial_js_usage.html
// import cv from "opencv-wasm"//docs.opencv.org
// import {cv} from "opencv-wasm"//
// const { cv, cvTranslateError } = require('opencv-wasm');

export default {
    name: "cv-start",
    data () {
        return {
        };
    },
    created(){
        // console.log(cv)
    },
    mounted(){
        // console.log("mounted")
        this.$nextTick(()=>{
            // 
        })
    },
    methods:{
        fileChange(e){
            this.$refs.imageSrc.src = URL.createObjectURL(e.target.files[0]);
        },
        imgLoad(e){
            // let mat = cv.imread(this.$refs.imageSrc);
            // cv.imshow(this.$refs.canvasOutput, mat);
            // mat.delete();
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-cv-start{
    
}
</style>