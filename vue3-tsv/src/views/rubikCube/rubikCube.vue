<template>
  <div class="component-rubik-cube flex-layout">
    <!-- rubikCube -->
    <div class="three flex-auto" ref="threeRef" v-resize="onResize"></div>
  </div>
</template>

<script setup lang="ts">
/* message */
import { 
    defineProps, defineEmits, useSlots, useAttrs, nextTick, 
    ref, onMounted, onBeforeUnmount
} from 'vue'

// import {
//     Scene,
//     PerspectiveCamera,
//     WebGLRenderer,
//     BoxGeometry,
//     MeshBasicMaterial,
//     MeshLambertMaterial,
//     Mesh,
//     PointLight,
//     AmbientLight,
// } from "three"


import THREE from "three"
const {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    PointLight,
    AmbientLight,
} = THREE


const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const threeRef = ref(null)
const threeObj = {}
const speed = ref(0.05)
let alive = true
onBeforeUnmount(() => {
    alive = false
})

onMounted(async ()=>{
    await nextTick();
    init()
})
function init(){
    let el=threeRef.value
    if(!el){
        return
    }
    let scene = new Scene();
    
    let camera = new PerspectiveCamera(75, el.clientWidth/el.clientHeight, 0.1, 1000);
    
    let renderer = new WebGLRenderer();
    
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    let geometry = new BoxGeometry(1,1,1);
    // let material = new MeshBasicMaterial({color: 0x00ff00});
    let material = new MeshLambertMaterial({
        color: 0x00d000
    }); //材质对象Material
    let cube = new Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    
    //点光源
    let point = new PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new AmbientLight(0x888888);
    scene.add(ambient);

    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    
    threeObj.scene = scene
    threeObj.camera = camera
    threeObj.renderer = renderer
    threeObj.geometry = geometry
    threeObj.material = material
    threeObj.cube = cube
    render()
}
function render() {
    if(!alive){
        return
    }
    // requestAnimationFrame(render);
    threeObj.cube.rotation.x += speed.value;
    threeObj.cube.rotation.y += speed.value;
    
    // this.cube.rotateX(speed.value);
    // this.cube.rotateY(speed.value);
    // this.cube.rotateZ(speed.value);

    let width = threeRef.value.clientWidth; //窗口宽度
    let height = threeRef.value.clientHeight; //窗口高度
    //set camera
    threeObj.camera.aspect = width / height;
    threeObj.camera.updateProjectionMatrix();

    threeObj.renderer.setSize(width, height);//设置渲染区域尺寸
    threeObj.renderer.render(threeObj.scene, threeObj.camera);
}

function onResize(e){
    render()
}


</script>

<style lang="scss" scoped>
.component-rubik-cube {
  width: 100%;
  height: 100%;
}
.three{
    width: 100%;
    height: 100%;
}
</style>
