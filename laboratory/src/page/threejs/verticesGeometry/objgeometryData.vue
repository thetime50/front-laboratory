<template>
<div class="component-objgeometry-data flex-layout">
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
    name: "objgeometry-data",
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
            var geometry = new THREE.BoxGeometry(100, 100, 100, 2, 2, 2); //创建一个立方体几何对象Geometry
            console.log(geometry);
            console.log('几何体顶点位置数据',geometry.vertices);
            console.log('三角面数据',geometry.faces);

            // var geometry = new THREE.PlaneBufferGeometry(100, 100); //创建一个立方体几何对象Geometry
            // console.log(geometry);
            // console.log('几何体顶点位置数据',geometry.attributes.position);
            // console.log('几何体索引数据',geometry.index);

            var material = new THREE.MeshLambertMaterial({
                color: 0x0000ff,
                // wireframe:true,//线框模式渲染
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中

            // ***********************************************************
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // 遍历几何体的face属性
            geometry.faces.forEach(face => {
                // 设置三角面face三个顶点的颜色
                face.vertexColors = [
                    new THREE.Color(0xffff00),
                    new THREE.Color(0xff00ff),
                    new THREE.Color(0x00ffff),
                ]
            });
            var material = new THREE.MeshBasicMaterial({
                // color: 0x0000ff,
                vertexColors: THREE.FaceColors,
                // wireframe:true,//线框模式渲染
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, 130)
            scene.add(mesh); //网格模型添加到场景中

            //************************************************************
            var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            // pop()：删除数组的最后一个元素   shift：删除数组的第一个元素
            geometry.faces.pop();
            // geometry.faces.pop();
            geometry.faces.shift();
            // geometry.faces.shift();
            var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff,
            side: THREE.DoubleSide, //两面可见
            }); //材质对象Material
            var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            mesh.position.set(0, 0, -130)
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
.component-objgeometry-data{
    // 
}
</style>