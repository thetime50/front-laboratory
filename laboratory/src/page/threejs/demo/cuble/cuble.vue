<template>
<div class="component-cuble flex-layout">
    <div class="option flex-none">
        <el-form label-width="8rem">
          <el-form-item label="create at">
            {{new Date().toLocaleTimeString()}}
          </el-form-item>
          <el-form-item :label="'Speed:'+speed">
            <el-slider 
                v-model="speed"
                :min="0"
                :max="0.1"
                :step="0.001"
            ></el-slider>
          </el-form-item>
        </el-form>
    </div>
    <div class="three flex-auto" ref="three"></div>
</div>
</template>

<script>
/* message */
import * as THREE from "THREE"

export default {
    name: "cuble",
    data () {
        return {
            speed:0.05,
        };
    },
    created(){
        // console.log("hello")
        // console.log(Object.keys(THREE).join('\n'))
        // console.log(THREE,THREE.REVISION)//118.3
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    methods:{
        init(){
            let el=this.$refs.three
            if(!el){
                return
            }
            let scene = new THREE.Scene();
            
            let camera = new THREE.PerspectiveCamera(75, el.clientWidth/el.clientHeight, 0.1, 1000);
            
            let renderer = new THREE.WebGLRenderer();
            
            renderer.setSize(el.clientWidth, el.clientHeight);
            el.appendChild(renderer.domElement);
            var geometry = new THREE.CubeGeometry(1,1,1);
            var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
            var cube = new THREE.Mesh(geometry, material);
            scene.add(cube);
            camera.position.z = 5;
            this.scene = scene
            this.camera = camera
            this.renderer = renderer
            this.geometry = geometry
            this.material = material
            this.cube = cube
            this.render()
        },
        render() {
            requestAnimationFrame(this.render);
            this.cube.rotation.x += this.speed;
            this.cube.rotation.y += this.speed;
            this.renderer.render(this.scene, this.camera);
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-cuble{
    
    .option{
        max-width: calc(100% - 3rem);
        @media (min-width: 43rem){
          width:40rem;
        }
    }
}
</style>