<template>
<div class="component-object3d-operation flex-layout">
    <!-- <el-form class="flex-none">
        <el-form-item label="">
            <el-radio-group v-model="para.o3dIndex">
                <el-radio v-for="(item,index) in o3dOptions" :label="item.value" :key="index">
                    {{item.text}}
                </el-radio>
            </el-radio-group>      
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
import * as threeTool from "@/js/three/threeTool.js"

export default {
    name: "object3d-operation",
    data () {
        return {
            renderFun:null,
            para:{
                o3dIndex:0,
            },
            o3dOptions:[
                {text:'点',value:0},
                {text:'线',value:1},
                {text:'网格',value:2},
            ],
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
            let getO3ds=[
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    // 网格模型xyz方向分别缩放0.5,1.5,2倍
                    mesh.scale.set(0.5, 1.5, 2)
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    // 直接设置网格模型的位置
                    mesh.position.set(100, 100, 100)
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    // 网格模型沿着x轴方向平移100
                    mesh.translateX(100);
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

                    //向量Vector3对象表示方向
                    var axis = new THREE.Vector3(1, 1, 1);
                    axis.normalize(); //向量归一化
                    // 沿着axis轴表示方向平移100
                    mesh.translateOnAxis(axis, 100);
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    // 绕着Y轴旋转90度
                    // mesh.rotateY(Math.PI / 2);
                    mesh.rotateY(Math.PI / 8);
                    return mesh
                },
                function(geometry){
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x0000ff
                    }); //材质对象Material
                    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
                    //向量Vector3对象表示方向
                    var axis = new THREE.Vector3(1, 1, 1);
                    axis.normalize(); //向量归一化
                    // 绕axis轴旋转90度
                    mesh.rotateOnAxis ( axis, Math.PI / 2 )
                    // console.log(mesh.rotation);//控制台查看：旋转方法，改变了rotation属性
                    return mesh
                },
            ]

            getO3ds.forEach((ov,oi,oa)=>{
                let geometry = new THREE.BoxGeometry(100, 100, 100);
                let o3d = ov(geometry)
                threeTool.setO3dGep(o3d, [0,oi], [1,oa.length], [150,120], 'add')
                scene.add(o3d)
            })



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
            //环境光 // 各向均匀的 环境光颜色与网格模型的颜色进行RGB进行乘法运算
            let ambient = new THREE.AmbientLight(0x808080);
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
.component-object3d-operation{
    
}
</style>