<template>
<div class="component-grid flex-layout">
    <div class="option flex-none">
        <el-form label-width="8rem">
            <el-form-item label="create at">
                {{createAt}}
                <el-button @click="cam=camDefault()" size="mini" type="primary">Reset</el-button>
            </el-form-item>
            <el-form-item label="position">
                <el-input-number v-model="cam.px" size="mini" 
                    :step="cam.px | stepFilter(step)"></el-input-number>
                <el-input-number v-model="cam.py" size="mini" 
                    :step="cam.py | stepFilter(step)"></el-input-number>
                <el-input-number v-model="cam.pz" size="mini" 
                    :step="cam.pz | stepFilter(step)"></el-input-number>
            </el-form-item>
            <el-form-item label="lookAt">
                <el-input-number v-model="cam.lx" size="mini" 
                    :step="cam.lx | stepFilter(step)"></el-input-number>
                <el-input-number v-model="cam.ly" size="mini" 
                    :step="cam.ly | stepFilter(step)"></el-input-number>
                <el-input-number v-model="cam.lz" size="mini" 
                    :step="cam.lz | stepFilter(step)"></el-input-number>
            </el-form-item>
        </el-form>
        <el-form inline>
            <el-form-item label="step">
                <el-input-number v-model="step" label="auto" size="mini"></el-input-number>
            </el-form-item>
            <el-form-item label="laobj">
                <el-switch v-model="laobj" size="mini"></el-switch>
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
    name: "grid",
    data () {
        return {
            createAt:new Date().toLocaleTimeString(),
            speed:0.05,
            cam:this.camDefault(),
            step:0,
            laobj:false,
        };
    },
    mounted(){
        this.$nextTick(()=>{
            this.threeStart()
        })
    },
    filters:{
        stepFilter(v,step){
            return Number( step||Math.max(Math.abs(v)/10,0.01).toFixed(2) )
        }
    },
    methods:{
        camDefault(){
            return {
                px:0,
                py:1000,
                pz:0,
                lx:0,
                ly:0,
                lz:0,
            }
        },
        initThree() {
            // console.log(this.$refs.three)
            let el=this.$refs.three
            let renderer
            let width = el.clientWidth;
            let height = el.clientHeight;
            renderer = new THREE.WebGLRenderer({
                antialias : true
            });
            renderer.setSize(width, height);
            el.appendChild(renderer.domElement);
            renderer.setClearColor(0xd0d0ff, 1.0);
            this.renderer=renderer
        },
      
        initCamera() {
            let el=this.$refs.three
            let width = el.clientWidth;
            let height = el.clientHeight;
            let camera
            camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
            camera.position.x = 0;
            camera.position.y = 1000;
            camera.position.z = 0;
            camera.up.x = 0;
            camera.up.y = 0;
            camera.up.z = 1;
            camera.lookAt({
                x : 0,
                y : 0,
                z : 0
            });
        
            this.camera=camera
        },
        initScene() {
            this.scene = new THREE.Scene();
        },
        initLight() {
            let light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
            light.position.set(100, 100, 200);
            this.scene.add(light);
            this.light=light
        },

        // initObject() {
        //     var geometry = new THREE.Geometry();//几何体
        //     var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );//材质  顶点着色器
        //     var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

        //     // 线的材质可以由2点的颜色决定
        //     var p1 = new THREE.Vector3( -100, 0, 100 );
        //     var p2 = new THREE.Vector3(  100, 0, -100 );
        //     geometry.vertices.push(p1);
        //     geometry.vertices.push(p2);
        //     geometry.colors.push( color1, color2 );

        //     var line = new THREE.Line( geometry, material, THREE.LineSegments); // THREE.LinePieces );
        //     this.scene.add(line);
        //     this.line=line
            
        //     // console.log(this.scene)
        // },
      
        initObject() {
            // var geometry = new THREE.Geometry();
            // geometry.vertices.push( new THREE.Vector3( - 500, 0, 0 ) );
            // geometry.vertices.push( new THREE.Vector3( 500, 0, 0 ) );

            // for ( var i = 0; i <= 20; i ++ ) {
                // var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
                // line.position.z = ( i * 50 ) - 500;
                // this.scene.add( line );

                // var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } ) );
                // line.position.x = ( i * 50 ) - 500;
                // line.rotation.y = 90 * Math.PI / 180;
                // this.scene.add( line );
            // }
            let color1=new THREE.Color("hsl(120, 50%, 70%)")
            let color2=new THREE.Color("hsl(240, 50%, 70%)")
            var geometry = new THREE.GridHelper(1000,20,color1,color2)
            this.scene.add( geometry );
            // this.geometry=geometry
        },
        render(){
            // console.log(this.renderer,this.scene, this.camera)
            // this.line.rotation.x += this.speed;
            // this.line.rotation.y += this.speed;
            this.cameraSync()
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera);
            // requestAnimationFrame(this.render);
        },
        cameraSync(){
            this.camera.position.x =this.cam.px
            this.camera.position.y =this.cam.py
            this.camera.position.z =this.cam.pz
            if(this.laobj){
                this.camera.lookAt({
                    x: this.cam.lx,
                    y: this.cam.ly,
                    z: this.cam.lz,
                })
            }else{
                this.camera.lookAt(
                    this.cam.lx,
                    this.cam.ly,
                    this.cam.lz,
                )
            }
        },
        threeStart() {
            this.initThree();
            this.initCamera();
            this.initScene();
            this.initLight();
            this.initObject();
            this.render();
        },
    },
    watch:{
        cam:{
            handler(){
                this.$nextTick(()=>{
                    this.render();
                })
            },
            deep:true,
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-grid{
    .el-form-item{
        margin-bottom:10px;
    }
    .option{
        max-width: calc(100% - 3rem);
        @media (min-width: 43rem){
          width:40rem;
        }
    }
    
}
</style>