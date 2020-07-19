<template>
<div class="component-objgeometry-face flex-layout">
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
import "THREE/examples/js/controls/OrbitControls.js"

export default {
    name: "objgeometry-face",
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
            var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry

            var p1 = new THREE.Vector3(0, 0, 0); //顶点1坐标
            var p2 = new THREE.Vector3(0, 100, 0); //顶点2坐标
            var p3 = new THREE.Vector3(50, 0, 0); //顶点3坐标
            var p4 = new THREE.Vector3(0, 0, 100); //顶点4坐标
            //顶点坐标添加到geometry对象
            geometry.vertices.push(p1, p2, p3,p4); // 添加点集
            
            // Color对象表示顶点颜色数据
            var color1 = new THREE.Color(0x00ff00); //顶点1颜色——绿色
            var color2 = new THREE.Color(0xff0000); //顶点2颜色——红色
            var color3 = new THREE.Color(0x0000ff); //顶点3颜色——蓝色
            var color4 = new THREE.Color(0xffff00); //顶点3颜色——黄色
            //顶点颜色数据添加到geometry对象
            geometry.colors.push(color1, color2, color3, color4); // 添加颜色集 // mesh渲染不要使用这数据 这里这一段是无效代码

            // face1 *********************************************************
            // Face3构造函数创建一个三角面
            var face1 = new THREE.Face3(0, 1, 2);
            //三角面每个顶点的法向量
            var n1 = new THREE.Vector3(0, 0, -1); //三角面Face1顶点1的法向量
            var n2 = new THREE.Vector3(0, 0, -1); //三角面2Face2顶点2的法向量
            var n3 = new THREE.Vector3(0, 0, -1); //三角面3Face3顶点3的法向量
            // 设置三角面Face3三个顶点的法向量
            face1.vertexNormals.push(n1,n2,n3); // 对网格模型的顶点设置颜色
            // 设置三角面face1三个顶点的颜色
            face1.vertexColors = [
                new THREE.Color(0xffff00),
                new THREE.Color(0xff00ff),
                new THREE.Color(0x00ffff),
            ]

            // face2 ********************************************************
            // 三角面2
            var face2 = new THREE.Face3(0, 2, 3);
            // 设置三角面法向量
            face2.normal=new THREE.Vector3(0, -1, 0); // 对网格模型整个面设置颜色
            face2.color = new THREE.Color(0x00ff00);

            //三角面face1、face2添加到几何体中
            geometry.faces.push(face1,face2); // 几何体添加面



            //材质对象
            var material = new THREE.MeshLambertMaterial({
                // color: 0xffff00,
                // vertexColors: THREE.VertexColors, //以顶点颜色为准
                vertexColors: THREE.FaceColors,
                side:THREE.DoubleSide//两面可见
            });
            //网格模型对象
            var mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh); //网格模型对象添加到场景中

            // 点渲染模式
            // var material = new THREE.PointsMaterial({
            //   color: 0xff0000,
            //   size: 5.0 //点对象像素尺寸
            // }); //材质对象
            // var points = new THREE.Points(geometry, material); //点模型对象
            // scene.add(points); //点对象添加到场景中

            // 辅助坐标系
            var axisHelper = new THREE.AxisHelper(250);
            scene.add(axisHelper);
            /**
             * 光源设置
             */
            //点光源
            var point = new THREE.PointLight(0xffffff);
            point.position.set(400, 200, 300); //点光源位置
            scene.add(point); //点光源添加到场景中
            //环境光
            var ambient = new THREE.AmbientLight(0x444444);
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
.component-objgeometry-face{
    // 
}
</style>