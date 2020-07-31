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

import DicomThree from "./DicomThree.js"

import { colors, files } from '@/page/ami/amiStart/utils.js';

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


            // new THREE.TextureLoader().load( "/static/image/bili.png",(texture)=>{
            //     console.log(texture)
            //     this._textureText = texture
            //     this.init()
            // });
            // this._textureText = await threeTool.asyncTextureLoader( "https://cdn.jsdelivr.net/gh/thetime50/thetime50.github.io@hexo/source/resume/img/bili.png" );
            // this._textureText = await threeTool.asyncTextureLoader("./static/image/bili.png")
            let textureText = await threeTool.asyncTextureLoader("./static/image/bili-trans.png")

            let [canvas] = await this.drawImage("./static/image/bili-trans.png")
            let textureText2 =  new THREE.CanvasTexture(canvas)
            let el = this.$refs.three
            let dt = new DicomThree(el)
            this._dt = dt
            dt.add(dt.getMesh(textureText))
            dt.add(dt.getMesh(textureText2,[0,0,50]),true)
            // this.$refs.three.appendChild(canvas)

            // Load DICOM images and create AMI Helpers
            const loader = new AMI.VolumeLoader(el);
            // console.log(loader,files)
            loader
                .load(files)
                .then(() => {
                    const series = loader.data[0].mergeSeries(loader.data);//什么意思 可以节省内存吗
                    const stack = series[0].stack[0];
                    console.log(loader,series,stack)
                    loader.free();

                    // const stackHelper = new AMI.StackHelper(stack);
                    // stackHelper.bbox.color = colors.red;
                    // stackHelper.border.color = colors.blue;

                    // // console.log(stackHelper)

                    // scene.add(stackHelper);

                    // // build the gui
                    // gui(stackHelper);

                    // // center camera and interactor to center of bouding box
                    // const centerLPS = stackHelper.stack.worldCenter();
                    // camera.lookAt(centerLPS.x, centerLPS.y, centerLPS.z);
                    // camera.updateProjectionMatrix();
                    // controls.target.set(centerLPS.x, centerLPS.y, centerLPS.z);
                })
                .catch(error => {
                    window.console.log('oops... something went wrong...');
                    window.console.log(error);
                });
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
        drawImage(src) {
            return new Promise(function(resolt,reject){
                let img=new Image();
                img.onload=function(e) {
                    // console.log('drawImage')
                    // console.dir(img)
                    // console.dir(e)

                    let canvas = document.createElement("canvas");
                    canvas.style.height = img.height+'px'
                    canvas.style.width = img.width+'px'
                    canvas.height = img.height//+'px'
                    canvas.width = img.width//+'px'
                    // 获取在canvas上绘图的CanvasRenderingContext2D对象
                    let ctx = canvas.getContext('2d');
                    // 绘制图片
                    ctx.drawImage(img ,0,0)//, x , y);
                    // 获取从x、y开始，宽为image.width、高为image.height的图片数据
                    // 也就是获取绘制的图片数据
                    let imgData = ctx.getImageData(0 , 0 , img.width , img.height);
                    
                    ctx.putImageData(imgData , 0,0);
                    // console.log(imgData)
                    // resolt(imgData)
                    resolt([canvas,ctx])
                }
                img.onerror=reject
                img.src=src;
            })
        },
    },
    watch:{
        // getMesh(after,before){
        //     this.init()
        // },
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