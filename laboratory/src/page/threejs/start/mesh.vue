<template>
<div class="component-mesh">
    <!-- geometry -->
    <div class="three full-block" ref="three"></div>
</div>
</template>

<script>
/* message */
import * as THREE from "THREE"
import "THREE/examples/js/controls/OrbitControls.js"

export default {
    name: "mesh",
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
            let geometrys = []
            
            
            // todo BoxGeometry and BoxBufferGeometry 表达不一样??
            let colors = [0x8080f, 0x80ffff, 0x80ff80,
                0xffff80, 0xff8080, 0xff80ff]

            // //基础网格材质对象   不受光照影响  没有棱角感
            //长方体 参数：长，宽，高
            geometrys.push({
                geometry:new THREE.BoxGeometry(100, 100, 100),
                material:new THREE.MeshBasicMaterial({
                    color: colors[0],
                    wireframe:true,//线条模式渲染
                })
            });
            // 球体 参数：半径60  经纬度细分数40,40
            geometrys.push({
                geometry:new THREE.SphereGeometry(60, 40, 40),
                material:new THREE.MeshBasicMaterial({
                    color: colors[1],
                })
            });

            
            // 与光照计算  漫反射   产生棱角感
            // 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
            geometrys.push({
                geometry:new THREE.CylinderGeometry( 50, 50, 100, 25 ),
                material:new THREE.MeshLambertMaterial({
                    color: colors[2],
                })
            });
            // 正八面体
            geometrys.push({
                geometry:new THREE.OctahedronGeometry(50),
                material:new THREE.MeshLambertMaterial({
                    color: colors[3],
                })
            });
            // 与光照计算  高光效果（镜面反射）    产生棱角感
            // 正十二面体
            geometrys.push({
                geometry:new THREE.DodecahedronGeometry(50),
                material:new THREE.MeshPhongMaterial({
                    color: colors[4],
                    specular:0x444444,
                    shininess:30,
                })
            });
            // 正二十面体
            geometrys.push({
                geometry:new THREE.IcosahedronGeometry(50),
                material:new THREE.MeshPhongMaterial({
                    color: colors[5],
                    specular:0x444444,
                    shininess:30,
                })
            });

            geometrys.forEach((v,i,a)=>{

                let mesh = new THREE.Mesh(v.geometry, v.material); //网格模型对象Mesh

                let col = 3
                let gap = 130
                mesh.position.set(i%3*gap - gap, 0 ,Math.floor(i/3)*gap - gap/2)
                // mesh.translateY(xxx)
                scene.add(mesh); //网格模型添加到场景中
            })
            
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
            //环境光
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
.component-mesh{
    // 
}
</style>