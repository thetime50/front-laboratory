<template>
<div class="component-vertices flex-layout">
    <el-form class="flex-none"> <!-- :model="" -->
        <el-form-item label="">
            <el-radio-group v-model="meshIndex">
                <el-radio v-for="(item,index) in meshOptions" :label="item.value" :key="index">
                    {{item.text}}
                </el-radio>
            </el-radio-group>      
        </el-form-item>
    </el-form>
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
    name: "vertices",
    data () {
        return {
            renderFun:null,
            meshIndex:0,
            meshOptions:[
                {text:'三角面(网格)渲染',value:0},
                {text:'点渲染模',value:1},
                {text:'线条渲染',value:2},
            ],
        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    computed:{
        getMesh(){
            let map=[
                // 与光照计算  漫反射   产生棱角感
                (geometry,color)=>{
                    /**
                     * 创建网格模型
                     */
                    // 三角面(网格)渲染模式
                    let material = new THREE.MeshBasicMaterial({
                        color: color, //三角面颜色
                        side: THREE.DoubleSide //两面可见
                    }); //材质对象
                    return new THREE.Mesh(geometry, material); //网格模型对象Mesh
                },
                // 与光照计算  高光效果（镜面反射）    产生棱角感
                (geometry,color)=>{
                    /**
                     * 创建网格模型
                     */
                    // 点渲染模式
                    let material = new THREE.PointsMaterial({
                        color: color,
                        size: 5.0 //点对象像素尺寸
                    }); //材质对象
                    return new THREE.Points(geometry, material); //点模型对象
                },
                // 与光照计算  高光效果（镜面反射）    产生棱角感
                (geometry,color)=>{
                    /**
                     * 创建网格模型
                     */
                    // 线条渲染模式
                    let material = new THREE.LineBasicMaterial({
                        color:color //线条颜色
                    });//材质对象
                    return new THREE.Line(geometry,material);//线条模型对象
                },
            ]
            return map[this.meshIndex]
        },
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
            var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
            //类型数组创建顶点数据
            var vertices = new Float32Array([
                0, 0, 0, //顶点1坐标
                50, 0, 0, //顶点2坐标
                0, 100, 0, //顶点3坐标
                0, 0, 10, //顶点4坐标
                0, 0, 100, //顶点5坐标
                50, 0, 10, //顶点6坐标
            ]);
            // 创建属性缓冲区对象
            var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
            // 设置几何体attributes属性的位置属性
            geometry.attributes.position = attribue;

            
            // // 三角面(网格)渲染模式
            // var material = new THREE.MeshBasicMaterial({
            // color: 0x0000ff, //三角面颜色
            // side: THREE.DoubleSide //两面可见
            // }); //材质对象
            // var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
            // scene.add(mesh); //网格模型添加到场景中

            // // 点渲染模式
            // // var material = new THREE.PointsMaterial({
            // //   color: 0xff0000,
            // //   size: 5.0 //点对象像素尺寸
            // // }); //材质对象
            // // var points = new THREE.Points(geometry, material); //点模型对象
            // // scene.add(points); //点对象添加到场景中

            // // 线条渲染模式
            // // var material=new THREE.LineBasicMaterial({
            // //     color:0xff0000 //线条颜色
            // // });//材质对象
            // // var line=new THREE.Line(geometry,material);//线条模型对象
            // // scene.add(line);//线条对象添加到场景中
            
            var mesh = this.getMesh(geometry,0x0000ff)
            scene.add(mesh); //网格模型添加到场景中


            // 辅助坐标系
            var axisHelper = new THREE.AxisHelper(250);
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
        getMesh(after,before){
            this.init()
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-vertices{
    // 
}
</style>