<template>
<div class="component-viewers-upload flex-layout">
    <div class="flex-none">
        viewers-upload
    </div>
    <div class="flex-auto">
        
        <!-- home page -->
        <div id="home-container">
        <div id="buttons">
            <button type="button" id="buttoninput">Dicom<br/>Mgh/z<br/>Nifti<br/>Nrrd</button>
            <input id="filesinput" type="file" multiple>
        </div>
        </div>

        <!-- the container for the renderers -->
        <div id="my-gui-container"></div>
        <div id="my-lut-container">
        <div id="my-lut-canvases"></div>
        </div>

        <div id="viewer">
        <div id="orientation">
            <div id="top" class="direction"></div>
            <div id="bottom" class="direction"></div>
            <div id="left" class="direction"></div>
            <div id="right" class="direction"></div>
        </div>
        <div id="r3d" ref="r3d"></div>
        </div>


        <div style="background-color: #f9f9f9; width: 0; height: 0;"></div>

    </div>
</div>
</template>

<script>
// https://github.com/FNNDSC/ami/tree/master/examples/viewers_upload
// https://fnndsc.github.io/ami/#viewers_upload
/* message */
/* globals dat*/
import * as THREE from "THREE"

import CoreUtils from 'ami.js/src/core/core.utils';
import LoadersVolume from 'ami.js/src/loaders/loaders.volume';
import HelpersStack from 'ami.js/src/helpers/helpers.stack';
import HelpersLut from 'ami.js/src/helpers/helpers.lut';
import CamerasOrthographic from 'ami.js/src/cameras/cameras.orthographic';
import ControlsOrthographic from 'ami.js/src/controls/controls.trackballortho';

export default {
    name: "viewers-upload",
    data () {
        return {
            // standard global variables
            controls:null,
            renderer:null,
            scene:null,
            camera:null,
            threeD:null,
            lut:null,

            ctrlDown :false,
            drag : {
                start: {
                    x: null,
                    y: null,
                },
            },

            // probe
            camUtils : {
                invertRows: false,
                invertColumns: false,
                rotate: false,
                orientation: 'default',
                convention: 'radio',
            },
        };
    },
    methods:{
        init() {
            /**
             * Animation loop
             */
            function animate() {
                // render
                this.controls.update();
                this.renderer.render(this.scene, this.camera);

                // request new frame
                requestAnimationFrame(function() {
                animate();
                });
            }

            // renderer
            this.threeD = this.$refs.r3d;
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
            });
            this.renderer.setSize(this.threeD.clientWidth, this.threeD.clientHeight);
            this.renderer.setClearColor(0x212121, 1);

            this.threeD.appendChild(this.renderer.domElement);

            // scene
            this.scene = new THREE.Scene();
            // camera
            this.camera = new CamerasOrthographic(
                this.threeD.clientWidth / -2,
                this.threeD.clientWidth / 2,
                this.threeD.clientHeight / 2,
                this.threeD.clientHeight / -2,
                0.1,
                10000
            );

            // controls
            this.controls = new ControlsOrthographic(this.camera, threeD);
            this.controls.staticMoving = true;
            this.controls.noRotate = true;
            this.camera.controls =  this.controls;

            animate();
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-viewers-upload{
    @import "./viewers_upload.css";
}
</style>