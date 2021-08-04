<template>
<div class="component-control">
    <!-- control -->
    <div class="three full-block" ref="three"></div>
</div>
</template>

<script>
/* message */
import * as THREE from "THREE"
import "THREE/examples/js/controls/OrbitControls.js"

export default {
    name: "control",
    data () {
        return {
        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    methods:{
        init(){
            /**
             * 创建场景对象Scene
             */
            let scene = new THREE.Scene();
            /**
             * 创建网格模型
             */
            // let geometry = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
            let geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
            let material = new THREE.MeshLambertMaterial({
                color: 0xffa0a0
            }); //材质对象Material
            let mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            scene.add(mesh); //网格模型添加到场景中
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
            renderer.setSize(width, height);//设置渲染区域尺寸
            renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
            this.$refs.three.appendChild(renderer.domElement); //body元素中插入canvas对象
            //执行渲染操作   指定场景、相机作为参数
            renderer.render(scene, camera);

            
            // 渲染函数
            function render() {
            renderer.render(scene, camera); //执行渲染操作
            }
            render();
            //创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
            let controls = new THREE.OrbitControls(camera,renderer.domElement);
            //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
            controls.addEventListener('change', render);//移动相机
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-control{
    // 
}
</style>