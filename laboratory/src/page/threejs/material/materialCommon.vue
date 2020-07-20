<template>
<div class="component-material-common flex-layout">
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

export default {
    name: "material-common",
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
            let getGeometrys = [
                function(){
                    return new THREE.BoxGeometry(100, 100, 100);
                },
                function(){
                    return new THREE.SphereGeometry(50, 25, 25);
                },
            ]
            let getO3ds=[
                function(geometry){
                    // 创建一个点材质对象
                    let material = new THREE.PointsMaterial({
                        color: 0x0000ff, //颜色
                        size: 3, //点渲染尺寸
                    });
                    //点模型对象  参数：几何体  点材质
                    let point = new THREE.Points(geometry, material);
                    return point
                },
                function(geometry){
                    // 虚线材质对象：产生虚线效果
                    var material = new THREE.LineDashedMaterial({
                        color: 0x0000ff,
                        dashSize: 10,//显示线段的大小。默认为3。
                        gapSize: 5,//间隙的大小。默认为1
                    });
                    var line = new THREE.Line(geometry, material); //线模型对象
                    //  computeLineDistances方法  计算LineDashedMaterial所需的距离数组
                    line.computeLineDistances();//计算虚线
                    return line
                },
                function(geometry){
                    //基础网格材质对象   不受光照影响  没有棱角感
                    var material = new THREE.MeshBasicMaterial({
                        color: 0x0000ff,
                    })
                    //  网格模型对象 参数：几何体  网格Mesh材质
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh
                },
                function(geometry){
                    // 与光照计算  漫反射   产生棱角感  粗糙不光亮暗淡的材质表面
                    var material = new THREE.MeshLambertMaterial({
                        color: 0x00ff00,
                    });
                    //  网格模型对象 参数：几何体  网格Mesh材质
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh
                },
                function(geometry){
                    // 与光照计算  高光效果（镜面反射）  高亮的材质表面
                    var material = new THREE.MeshPhongMaterial({
                        color: 0xff0000,
                        // specular:0x444444,//高光部分的颜色
                        // shininess:20,//高光部分的亮度，默认30
                        specular:0x006000,//高光部分的颜色
                        shininess:20,//高光部分的亮度，默认30
                    });
                    //  网格模型对象 参数：几何体  网格Mesh材质
                    var mesh = new THREE.Mesh(geometry, material);
                    return mesh
                },
            ]

            let setO3dGep = function(o3d, [x,y], [xc,yc], [xgap,ygap]) {
                o3d.position.set((x-(xc-1)/2)*xgap ,0 ,(y-(yc-1)/2)*ygap)
            }
            getGeometrys.forEach((gv,gi,ga)=>{
                getO3ds.forEach((ov,oi,oa)=>{
                    let geometry = gv()
                    let o3d = ov(geometry)
                    setO3dGep(o3d, [gi,oi], [ga.length,oa.length], [150,120])
                    scene.add(o3d)
                })
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
.component-material-common{
    
}
</style>