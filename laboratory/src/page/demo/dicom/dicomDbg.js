import * as threeTool from "@/js/three/threeTool.js"
import anime from "animejs"
import * as AMI from "ami.js"

import DicomThree from "./DicomThree.js"

import { colors, files } from '@/page/ami/amiStart/utils.js';


function drawImage(src) {
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
}

async function imageThreeTest(){
    
    // new THREE.TextureLoader().load( "/static/image/bili.png",(texture)=>{
    //     console.log(texture)
    //     this._textureText = texture
    //     this.init()
    // });
    // this._textureText = await threeTool.asyncTextureLoader( "https://cdn.jsdelivr.net/gh/thetime50/thetime50.github.io@hexo/source/resume/img/bili.png" );
    // this._textureText = await threeTool.asyncTextureLoader("./static/image/bili.png")
    let textureText = await threeTool.asyncTextureLoader("./static/image/bili-trans.png")

    let [canvas] = await drawImage("./static/image/bili-trans.png")
    let textureText2 =  new THREE.CanvasTexture(canvas)
    let el = this.$refs.three
    let dt = new DicomThree(el)
    this._dt = dt
    // dt.add(dt.getMesh(textureText))
    // dt.add(dt.getMesh(textureText2,[0,0,50]),true)
    // this.$refs.three.appendChild(canvas)
    
    //mesh
    await dt.amiInit(files)

    this.dtPara.fileCnt = dt.result.count
    this.opration.rangeIndex = [0,this.dtPara.fileCnt]
}

/********************************************************************* */
function AMI2ImgTest(){
    let el = this.$refs.three
    // Load DICOM images and create AMI Helpers
    const loader = new AMI.VolumeLoader(el);
    // console.log(loader,files)
    loader
        .load(files)
        .then(() => {
            const series = loader.data[0].mergeSeries(loader.data);//好像把相同配置的数据合到一起
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

            /******************************** */
            
            console.log(stack.frame == stack._frame,stack.frame[1] == stack._frame[1])
            stack._frame=stack.frame = stack.frame.sort((v1,v2)=>{
                return v1.instanceNumber - v2.instanceNumber
            })
            // console.table(stack.frame,['_instanceNumber','_imageOrientation','_imagePosition','numberOfChannels','_pixelSpacing'])
            console.table(stack.frame.map((v,i,a)=>{
                return {
                    instanceNumber:v.instanceNumber,
                    // imageOrientation,
                    x:v.imagePosition[0],
                    y:v.imagePosition[1],
                    z:v.imagePosition[2],
                    numberOfChannels:v.numberOfChannels,
                    // pixelSpacing:v.pixelSpacing,
                }
            }),['instanceNumber','x','y','z','numberOfChannels','pixelSpacing'])
            let dp = new DicomThree.DataParse(stack.frame[0],(des,src)=>{
                src.forEach((v,i,a)=>{
                    let index = 4*i
                    des[index] = v-200
                    des[index+1] = v-200
                    des[index+2] = v-200
                    des[index+3] = 255
                })
            })
            this.$refs.three.appendChild(dp.canvas)
        })
        .catch(error => {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
        });
}

export{
    imageThreeTest,
    AMI2ImgTest,
}