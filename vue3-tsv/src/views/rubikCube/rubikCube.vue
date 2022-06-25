<template>
  <div class="component-rubik-cube flex-layout frow">
    <!-- rubikCube -->
    <div class="three flex-auto" ref="threeRef" v-resize:throttle="onResize"></div>
    <div id="point"></div>
    <div class="right flex-0">
        <a-typography-title :level="3" class="title">
            控制台
        </a-typography-title>
        <a-form>
            <a-form-item class="state">
                状态： <a-tag :color="cubeData.finish? 'success': 'default'  " >{{cubeData.finish ? '还原': '打乱'}}</a-tag>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="onReset" size="mini">还原</a-button>
            </a-form-item>
        </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
/* message */
import { 
    /* defineProps, defineEmits, */ useSlots, useAttrs, nextTick, 
    ref, onMounted, onBeforeUnmount,
    Ref,
} from 'vue'

import Rubiks from "./rubiks/index"

import {
    Scene,
    BufferGeometry,
    Material,
    Object3D,

    PerspectiveCamera,
    WebGLRenderer,
    BoxGeometry,
    MeshBasicMaterial,
    MeshLambertMaterial,
    Mesh,
    PointLight,
    AmbientLight,
} from "three"


// import THREE from "three"
// const {
//     Scene,
//     PerspectiveCamera,
//     WebGLRenderer,
//     BoxGeometry,
//     MeshBasicMaterial,
//     MeshLambertMaterial,
//     Mesh,
//     PointLight,
//     AmbientLight,
// } = THREE

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

const threeRef : Ref<Element|null> = ref(null)


const threeObj : {
    scene?:Scene,
    camera?:PerspectiveCamera,
    renderer?:WebGLRenderer,
    geometry?:BufferGeometry,
    material?:Material,
    cube?:Object3D,
} = {} 
const speed = ref(0.05)
let alive = true
onBeforeUnmount(() => {
    alive = false
})

let rubiks:Rubiks|null = null
let cubeData = ref({
    finish: false
})

onMounted(async ()=>{
    await nextTick();
    rubiks = new Rubiks(threeRef.value!, {rotateDone});
    // init()
})

function rotateDone(e){
    console.log('e', e)
    cubeData.value.finish =  e.finish
}

//////////////////////////////////////////

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
    if(!alive || ! threeObj.cube){
        return
    }
    // requestAnimationFrame(render);
    threeObj.cube.rotation.x += speed.value;
    threeObj.cube.rotation.y += speed.value;
    
    // this.cube.rotateX(speed.value);
    // this.cube.rotateY(speed.value);
    // this.cube.rotateZ(speed.value);

    let width = threeRef.value!.clientWidth; //窗口宽度
    let height = threeRef.value!.clientHeight; //窗口高度
    //set camera
    threeObj.camera!.aspect = width / height;
    threeObj.camera!.updateProjectionMatrix();

    threeObj.renderer!.setSize(width, height);//设置渲染区域尺寸
    threeObj.renderer!.setPixelRatio(window.devicePixelRatio);
    threeObj.renderer!.render(threeObj.scene!, threeObj.camera!);
}

function onResize(e: Element){
    // render()
    rubiks && rubiks.resize()
}

function onReset(){
    rubiks?.restore( )
}


</script>

<style lang="scss" scoped>
.component-rubik-cube {
  position: relative;
  width: 100%;
  height: 100%;
}
.three{
    width: 100%;
    height: 100%;
}
#point{
    position: absolute;
    border-radius: 50%;
    width: 4px;
    height: 4px;
    background-color: #000;
}
.right{
    width: 400px;
    padding: 20px;
    .ant-form-item{
        margin-bottom: 12px;
    }
}
</style>
