<template>
<div class="component-vertices-index flex-layout">
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
    name: "vertices-index",
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
            var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
            //类型数组创建顶点位置position数据
            var vertices = new Float32Array([
                0, 0, 0, //顶点1坐标
                80, 0, 0, //顶点2坐标
                80, 80, 0, //顶点3坐标
                0, 80, 0, //顶点4坐标
            ]);
            // 创建属性缓冲区对象
            var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
            // 设置几何体attributes属性的位置position属性
            geometry.attributes.position = attribue
            var normals = new Float32Array([
                0, 0, 1, //顶点1法向量
                0, 0, 1, //顶点2法向量
                0, 0, 1, //顶点3法向量
                0, 0, 1, //顶点4法向量
            ]);
            // 设置几何体attributes属性的位置normal属性
            geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标

            //*highlight
            // Uint16Array类型数组创建顶点索引数据
            var indexes = new Uint16Array([
                0, 1, 2, 0, 2, 3,
            ])
            // 索引数据赋值给几何体的index属性
            geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
            //材质对象
            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff, //三角面颜色
                side: THREE.DoubleSide //两面可见
            });
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中

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
.component-vertices-index{
    // 
}
</style>