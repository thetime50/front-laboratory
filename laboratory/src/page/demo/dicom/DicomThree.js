
import * as threeTool from "@/js/three/threeTool.js"
import anime from "animejs"
import * as AMI from "ami.js"
import * as THREE from "THREE"
import "THREE/examples/js/controls/OrbitControls.js"
// import { exp } from "mathjs"
// import "THREE/examples/js/renderers/CSS3DRenderer.js"

import DataParse from "./DataParse.js"

// const { exp } = require("mathjs");
class DicomThree{
    static DataParse = DataParse
    constructor (el,format){
        /**three */
        this.el = el
        this.threeInit(el)

        this.config = {}
        this.origin = {}
        this.result = {}
        this.t3d = {}

        this.configInit(format)
    }
    configInit(format){
        let config = this.config
        config.format = format || ((des,src)=>{
            src.forEach((v,i,a)=>{
                let index = 4*i
                des[index] = v-200
                des[index+1] = v-200
                des[index+2] = v-200
                des[index+3] = 255
            })
        })
    }
    /**three */
    threeInit(el){
        this.el = el
        if(el.firstChild){
            el.removeChild(el.firstChild)
        }
        /**
         * 创建场景对象Scene
         */
        let scene = new THREE.Scene();

        // 辅助坐标系
        let axisHelper = new THREE.AxisHelper(250);
        scene.add(axisHelper);
        /**
         * 光源设置
         */
        //点光源
        // let point = new THREE.PointLight(0xffffff);
        // point.position.set(400, 200, 300); //点光源位置
        // scene.add(point); //点光源添加到场景中
        //环境光
        let ambient = new THREE.AmbientLight(0xe0e0e0);
        scene.add(ambient);
        // console.log(scene)
        // console.log(scene.children)
        /**
         * 相机设置
         */
        let width = el.clientWidth; //窗口宽度
        let height = el.clientHeight; //窗口高度
        let k = width / height; //窗口宽高比
        let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        let camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        let renderer = new THREE.WebGLRenderer();
        // renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        el.appendChild(renderer.domElement); //body元素中插入canvas对象


        this.scene = scene
        this.camera = camera
        this.renderer = renderer

        //执行渲染操作   指定场景、相机作为参数
        this.renderFun = ()=>{
            let width = el.clientWidth; //窗口宽度
            let height = el.clientHeight; //窗口高度
            let k = width / height; //窗口宽高比
            let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
            //创建相机对象
            this.camera.left = -s * k,
            this.camera.right = s * k
            this.camera.top = s
            this.camera.bottom = -s
            this.camera.updateProjectionMatrix()

            renderer.setSize(width, height);//设置渲染区域尺寸
            renderer.render(this.scene, this.camera);
            
        }

        
        // 渲染函数
        this.renderFun()
        //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
        let controls = new THREE.OrbitControls(camera,renderer.domElement);
        //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
        controls.addEventListener('change', this.renderFun);//移动相机
    }
    add(obj,render=false){
        if(!Array.isArray(obj)){
            obj=[obj]
        }
        
        obj.forEach((v,i,a)=>{
            this.scene.add(v)
        })
        if(render){
            this.renderFun()
        }
    }
    remove(obj,render=false){
        if(!Array.isArray(obj)){
            obj=[obj]
        }
        
        obj.forEach((v,i,a)=>{
            this.scene.remove(v)
        })
        if(render){
            this.renderFun()
        }
    }
    getMesh(textureText,position){

        /**CSS3DObject 有专门的 CSS3DRenderer 环境**/
        // let mesh2 = new THREE.CSS3DObject(this._textureText2) 
        let geometry = new THREE.PlaneBufferGeometry( 100, 100 );
        let material = new THREE.MeshLambertMaterial( {  
            color: 0xffffff,  
            map: textureText,
            side: THREE.DoubleSide, //两面可见
            transparent:true,//开启透明度
            // opacity:0.5,//设置透明度具体值
        } );
        let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        position && mesh.position.set(...position)
        return mesh
    }
    // static dataType(data){
    //     console.log(data,Object.getPrototypeOf(data))
    //     if(Object.getPrototypeOf(data) == 'a'){
    //     }
    // }

    /**ami */
    async amiInit(urls){
        /**ami */
        this.origin = {
            urls:urls
        }
        this.result={
            count: 0,
        }

        this.t3d = {
            center:[0,0,0],
            meshs:[],
            showMeshs:[],
        }

        await this.amiLoad()
        this.ami2canvas()
        this.ami2mesh()
    }
    async amiLoad(){
        const loader = this.el ? new AMI.VolumeLoader(this.el) : new AMI.VolumeLoader() 
        // console.log(loader,files)
        await loader.load(this.origin.urls)
        const series = loader.data[0].mergeSeries(loader.data);//好像把相同配置的数据合到一起
        const stack = series[0].stack[0];
        loader.free();
        stack._frame=stack.frame = stack.frame.sort((v1,v2)=>{
            return v1.instanceNumber - v2.instanceNumber
        })
        // console.log(loader,series,stack)

        this.result.loader = loader
        this.result.stack = stack
        this.result.count = stack.frame.length
        // }catch (error){
        //     window.console.log('oops... something went wrong...');
        //     window.console.log(error);
        // }
    }
    ami2canvas(format){
        format && (this.config.format = format)
        this.result.dps = this.result.stack.frame.map((v,i,a)=>{
            return new DicomThree.DataParse(v,this.config.format)
        })
    }
    ami2mesh(){
        console.log(this.result,this.t3d)
        let position0 = this.result.stack.frame[0].imagePosition
        let xmax, xmin
        let ymax, ymin
        let zmax, zmin
        xmax = xmin = position0[0]
        ymax = ymin = position0[1]
        zmax = zmin = position0[2]

        let frame = this.result.stack.frame
        frame.forEach((v,i,a)=>{
            let pst = v.imagePosition
            xmax = Math.max(xmax,pst[0])
            xmin = Math.min(xmin,pst[0])
            ymax = Math.max(ymax,pst[1])
            ymin = Math.min(ymin,pst[1])
            zmax = Math.max(zmax,pst[2])
            zmin = Math.min(zmin,pst[2])
        })
        this.t3d.center = [
            (xmax + xmin)/2,
            (ymax + ymin)/2,
            (zmax + zmin)/2,
        ]

        this.t3d.positions = frame.map((v,i,a)=>{
            let pst = v.imagePosition
            return [
                pst[0] - this.t3d.center[0],
                pst[1] - this.t3d.center[1],
                pst[2] - this.t3d.center[2],
            ]
        })
        //
        this.result.opacity = new DicomThree.DataParse(
            this.result.stack.frame[0],
            (des,src)=>{
                src.forEach((v,i,a)=>{
                    let index = 4*i
                    des[index] = 255
                    des[index+1] = 255
                    des[index+2] = 255
                    des[index+3] = 255
                })
            }
        )
        this.t3d.opacityTexture = new THREE.CanvasTexture(this.result.opacity.canvas)
        //
        this.t3d.textures = this.result.dps.map((v,i,a)=>{
            return new THREE.CanvasTexture(v.canvas)
        })
        this.t3d.meshs = this.t3d.textures.map((v,i,a)=>{
            return this.getMesh(v,this.t3d.positions[i])//todo size
        })
        // this.add(this.t3d.meshs,true)
        this.setMeshs([0,this.result.count],true)
    }
    setMeshs([start,end],render=false){//[start,end] 上下边界包含
        this.remove(this.t3d.showMeshs)
        this.t3d.showMeshs = this.t3d.meshs.slice(start,end+1)
        this.add(this.t3d.showMeshs,render)
    }

    // 公共的图像方法
    setTransparency(tra = true){
        // this.material // todo
        console.log(this.t3d.meshs)
        if(tra){
            this.t3d.meshs.forEach((v,i,a)=>{
                v.material.alphaMap = this.t3d.textures[i]
                v.material.map = this.t3d.opacityTexture
                // v.material.setValues("alphaMap", this.t3d.textures[i])
                // v.material.setValues("map", this.t3d.opacityTexture)
                v.updateMorphTargets()
            })
        }else{
            this.t3d.meshs.forEach((v,i,a)=>{
                v.material.alphaMap = null
                v.material.map = this.t3d.textures[i]
                // v.material.setValues("alphaMap", null)
                // v.material.setValues("map", this.t3d.textures[i])
                v.updateMorphTargets()
            })
        }
        // console.log("*",this.t3d.meshs)
        this.renderFun()
    }
    destroy(){
        // 
    }
}

export default DicomThree