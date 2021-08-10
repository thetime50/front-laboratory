<template>
<div class="component-objgeometry-operation flex-layout">
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
import * as THREE from "THREE"
import "three/examples/js/controls/OrbitControls.js"

export default {
    name: "objgeometry-operation",
    data () {
        return {
            renderFun:null,
            para:{
                // 
            },
        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    computed:{
        // 
    },
    methods:{
        render(){
            this.renderFun && this.renderFun()
        },
        onResize(){
            // this.render()
        },
        init(){
            
            let el = this.$refs.three
            // let el = document.querySelector('#material')
            if(el.firstChild){
                el.removeChild(el.firstChild)
            }


            /**
             * 创建场景对象Scene
             */
            let scene = new THREE.Scene();
            /**
             * 创建网格模型
             */
            //*highlight
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // console.log(geometry.vertices);
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, -260)
            scene.add(mesh); //网格模型添加到场景中
            
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 几何体xyz三个方向都放大2倍
            geometry.scale(1.2, 1.2, 1.2);//(2, 2, 2);
            // console.log(geometry.vertices);
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, -130)
            scene.add(mesh); //网格模型添加到场景中
            
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 几何体沿着x轴平移50
            geometry.translate(50, 0, 0);
            // console.log(geometry.vertices);
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, 0)
            scene.add(mesh); //网格模型添加到场景中
            
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 几何体绕着x轴旋转45度
            geometry.rotateX(- Math.PI / 9);//(Math.PI / 4);
            // console.log(geometry.vertices);
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, 130)
            scene.add(mesh); //网格模型添加到场景中

            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 居中：偏移的几何体居中
            geometry.center();
            // console.log(geometry.vertices);
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, 260)
            scene.add(mesh); //网格模型添加到场景中


            
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 几何体xyz三个方向都放大2倍
            // geometry.scale(2, 2, 2);
            // 几何体沿着x轴平移50
            // geometry.translate(50, 0, 0);
            // 几何体绕着x轴旋转45度
            // geometry.rotateX(Math.PI / 4);
            // 居中：偏移的几何体居中
            // geometry.center();
            console.log(geometry.vertices);

            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中


            // 辅助坐标系
            let axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);
            /**
             * 光源设置
             */
            //点光源
            let point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300); //点光源位置
            scene.add(point); //点光源添加到场景中
            //环境光
            let ambient = new THREE.AmbientLight(0x444444);
            scene.add(ambient);
            // console.log(scene)
            // console.log(scene.children)
            /**
             * 相机设置
             */
            let width = this.$refs.three.clientWidth; //窗口宽度
            let height = this.$refs.three.clientHeight; //窗口高度
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
            this.$refs.three.appendChild(renderer.domElement); //body元素中插入canvas对象
            //执行渲染操作   指定场景、相机作为参数
            this.renderFun = ()=>{
                let width = this.$refs.three.clientWidth; //窗口宽度
                let height = this.$refs.three.clientHeight; //窗口高度
                //set camera

                renderer.setSize(width, height);//设置渲染区域尺寸
                renderer.render(scene, camera);
                
            }

            
            // 渲染函数
            this.renderFun()
            //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
            let controls = new THREE.OrbitControls(camera,renderer.domElement);
            //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
            controls.addEventListener('change', this.renderFun);//移动相机
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
.component-objgeometry-operation{
    // 
}
</style>