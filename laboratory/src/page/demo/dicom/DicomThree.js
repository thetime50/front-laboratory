
import * as threeTool from "@/js/three/threeTool.js"
import anime from "animejs"
import * as THREE from "THREE"
import "THREE/examples/js/controls/OrbitControls.js"
// import "THREE/examples/js/renderers/CSS3DRenderer.js"

// const { exp } = require("mathjs");
class DicomThree{
    constructor (el){
        this.threeInit(el)
    }
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
    destroy(){
        // 
    }
}

export default DicomThree