<template>
    <div class="component-spline-view">
        <!-- <div class="left flex-auto">
            <div class="three" ref="threeRef" v-resize:throttle="onResize"></div>
            <div id="point"></div>
        </div> -->
        <div class="block">
            <div class="three" ref="threeRef"></div>
        </div>
        <div class="block">
            <canvas ref="canvasRef"></canvas>
        </div>
        <div class="demowrap">
            <p>移动:aswd 旋转视角:↑↓←→</p>
            <div class="block">
                <canvas ref="physicsCanvasRef"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* message */
import { 
    /* defineProps, defineEmits, */ useSlots, useAttrs, nextTick, 
    ref, onMounted, onBeforeUnmount,
    Ref,
} from 'vue';

import * as THREE from "three";
import SplineLoader from '@splinetool/loader';
// import SplineLoader from './SplineLoaderCopy.js';
import { Application } from '@splinetool/runtime';
// import "three/examples/mjs/controls/OrbitControls.js"
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import Stats from 'three/examples/jsm/libs/stats.module.js';

import splinetoolLoaderDemo from '@/assets/spline/2qM3cW5Cx15m3cJ7.scene.splinecode?url';
import splinetoolRuntimeDemo from '@/assets/spline/6Wq1Q7YGyM-iab9i.scene.splinecode?url';
import physicsDemo from '@/assets/spline/tZop-iX1JTDEFQ-I.scene.splinecode?url';
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

const threeRef : Ref<Element|null> = ref(null);
const canvasRef : Ref<HTMLCanvasElement|null> = ref(null);
const physicsCanvasRef : Ref<HTMLCanvasElement|null> = ref(null);

const loader : Ref<SplineLoader> = ref(new SplineLoader());


// todo
// let alive = true // eslint-disable-line
onBeforeUnmount(() => {
    // alive = false
});

onMounted(async ()=>{
    await nextTick();
    init();
    init2();
    init3();
});

function init(){
    
    let el=threeRef.value;
    if(!el){
        return;
    }
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75, el.clientWidth/el.clientHeight, 0.1, 2000);
    camera.position.z = 500;
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(el.clientWidth *2, el.clientHeight *2);
    el.appendChild(renderer.domElement);
    

    //点光源
    let point = new THREE.PointLight(0xffffff);
    point.position.set(400, 200, 300); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    let ambient = new THREE.AmbientLight(0x888888);
    scene.add(ambient);

    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

    function renderFun(){
        renderer.render(scene, camera);
    }
    renderFun();

    // let controls = new THREE.OrbitControls(camera,renderer.domElement);
    function orbitControlsInit(){
        let controls = new FirstPersonControls(camera,renderer.domElement);
        controls.movementSpeed = 150;
        controls.lookSpeed = 0.1;
    }
    function trackballControlsInit(){
        let controls = new TrackballControls(camera,renderer.domElement);
        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
        console.log('controls', controls);
        //监听鼠标事件，触发渲染函数，更新canvas画布渲染效果
        controls.addEventListener('change', renderFun);//移动相机

        // let stats = new Stats();
        let stats = Stats();
        el.appendChild(stats.dom);
        
        function animate() {

            requestAnimationFrame( animate );

            controls.update();

            stats.update();

            renderFun();

        }
        animate();
    }
    trackballControlsInit();
    

    // Load a .splinecode file
    let res = loader.value.load(
        // path to the .splinecode file, either from the Spline servers or local
        // 'https://prod.spline.design/2qM3cW5Cx15m3cJ7/scene.splinecode'
        splinetoolLoaderDemo,
        // called when the resource is loaded
        (splineScene) => {
            scene.add(splineScene);
            renderFun();
        },
        null,
        // called when loading has errors
        (error) => {
            console.log('An error happened',error);
        }
    );
    console.log('res', res);
}
async function init2(){
    let canvas=canvasRef.value;
    const spline = new Application(canvas);
    // 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'
    let res2 = await spline.load(splinetoolRuntimeDemo);
    console.log('res2', res2);

}

async function init3(){
    let canvas=physicsCanvasRef.value;
    const spline = new Application(canvas);
    // 'https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode'
    let res2 = await spline.load(physicsDemo);
    console.log('res2', res2);
}

function onResize(/* e: Element */){
    // 
}



</script>

<style lang="scss" scoped>
.component-spline-view {
  position: relative;
  width: 100%;
  height: 100%;
}

.block{
    position: relative;
    width: 600px;
    height: 360px;
    margin: auto;
}
.three{
    width: 100%;
    height: 100%;
    ::v-deep canvas{
        width: 100% !important;
        height: 100% !important;
    }
}
.demowrap{
    margin-top: 12px;
    p{
        margin: 0;
    }
    .block{
        width: 600px;
        height: 280px;
    }
}
</style>
