<template>
<div class="component-viewers-upload flex-layout">
    <div class="flex-none">
        viewers-upload
    </div>
    <div class="flex-auto prelative">
        
        <!-- home page -->
        <div class="home-container" ref="homeContainer">
            <div class="buttons" ref="buttons">
                <button type="button" class="buttoninput" ref="buttoninput" 
                    @click="buttoninputClick">
                    Dicom<br/>Mgh/z<br/>Nifti<br/>Nrrd
                </button>
                <input class="filesinput" ref="filesinput" type="file" multiple 
                    @change="filesinputChange">
            </div>
            </div>

            <!-- the container for the renderers -->
            <div class="my-gui-container" ref="my-gui-container"></div>
            <div class="my-lut-container" ref="my-lut-container">
            <div class="my-lut-canvases" ref="my-lut-canvases"></div>
            </div>

            <div class="viewer" ref="viewer">
            <div class="orientation" ref="orientation">
                <div ref="top" class="direction top"></div>
                <div ref="bottom" class="direction bottom"></div>
                <div ref="left" class="direction left"></div>
                <div ref="right" class="direction right"></div>
            </div>
            <div class="r3d" ref="r3d"></div>
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
            animateId:0,
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

            loader : null,
            seriesContainer : [],
        };
    },
    created(){
        console.log('created')
        this.$nextTick(()=>{
            this.start()
        })
    },
    beforeDestroy(){
        this.animateId && cancelAnimationFrame(this.animateId)
    },
    methods:{
        start() {
            // notify puppeteer to take screenshot
            // 好像没啥用
            // const puppetDiv = document.createElement('div');
            // puppetDiv.setAttribute('id', 'puppeteer');
            // document.body.appendChild(puppetDiv);
            this.init()
            this.loader = new LoadersVolume(this.threeD)
        },
        animate() {
            // render
            this.controls.update();
            this.renderer.render(this.scene, this.camera);

            // request new frame
            this.animateId = requestAnimationFrame(this.animate);
        },
        init() {
            /**
             * Animation loop
             */

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
            this.controls = new ControlsOrthographic(this.camera, this.threeD);
            this.controls.staticMoving = true;
            this.controls.noRotate = true;
            this.camera.controls =  this.controls;

            this.animate();
        },
        buttoninputClick(){
            this.$refs.filesinput.click()
        },
        /**
         * Filter array of data by extension
         * extension {String}
         * item {Object}
         * @return {Boolean}
         */
        _filterByExtension(extension, item) {
            if (item.extension.toUpperCase() === extension.toUpperCase()) {
            return true;
            }
            return false;
        },
        /**
         * Parse incoming files
         */
        // function readMultipleFiles(evt) {
        filesinputChange(evt){
            // hide the upload button
            if (evt.target.files.length) {
                this.$refs.homeContainer.style.display = 'none';
            }

            /**
             * Load sequence
             */
            function loadSequence(index, files) {//异步解析流程
                return (
                    Promise.resolve()
                    // load the file
                    .then(function() {
                        return new Promise(function(resolve, reject) {
                            let myReader = new FileReader();
                            // should handle errors too...
                            myReader.addEventListener('load', function(e) {
                                resolve(e.target.result);
                            });
                            myReader.readAsArrayBuffer(files[index]);
                        });
                    })
                    .then(function(buffer) {
                        return loader.parse({ url: files[index].name, buffer });
                    })
                    .then(function(series) {
                        console.log('222',this)
                        this.seriesContainer.push(series);
                    })
                    .catch(function(error) {
                        window.console.log('oops... something went wrong...');
                        window.console.log(error);
                    })
                );
            }

            /**
             * Load group sequence
             */
            function loadSequenceGroup(files) {
                const fetchSequence = [];

                for (let i = 0; i < files.length; i++) {
                    fetchSequence.push(
                        new Promise((resolve, reject) => {
                            const myReader = new FileReader();
                            // should handle errors too...
                            myReader.addEventListener('load', function(e) {
                                resolve(e.target.result);
                            });
                            myReader.readAsArrayBuffer(files[i].file);
                        }).then(function(buffer) {
                            return { url: files[i].file.name, buffer };
                        })
                    );
                }

                return Promise.all(fetchSequence)
                    .then(rawdata => {
                        return loader.parse(rawdata);
                    })
                    .then(function(series) {
                        console.log('111',this)
                        this.seriesContainer.push(series);
                    })
                    .catch(function(error) {
                        window.console.log('oops... something went wrong...');
                        window.console.log(error);
                    });
            }

            const loadSequenceContainer = [];

            const data = [];
            const dataGroups = [];
            // convert object into array
            for (let i = 0; i < evt.target.files.length; i++) {
                let dataUrl = CoreUtils.parseUrl(evt.target.files[i].name);
                if (
                    dataUrl.extension.toUpperCase() === 'MHD' ||
                    dataUrl.extension.toUpperCase() === 'RAW' ||
                    dataUrl.extension.toUpperCase() === 'ZRAW'
                ) {
                    dataGroups.push({
                        file: evt.target.files[i],
                        extension: dataUrl.extension.toUpperCase(),
                    });
                } else {
                    data.push(evt.target.files[i]);
                }
            }

            // check if some files must be loaded together
            if (dataGroups.length === 2) {
                // if raw/mhd pair
                const mhdFile = dataGroups.filter(this._filterByExtension.bind(null, 'MHD'));
                const rawFile = dataGroups.filter(this._filterByExtension.bind(null, 'RAW'));
                const zrawFile = dataGroups.filter(this._filterByExtension.bind(null, 'ZRAW'));
                if (mhdFile.length === 1 && (rawFile.length === 1 || zrawFile.length === 1)) {
                    loadSequenceContainer.push(loadSequenceGroup(dataGroups));
                }
            }

            // load the rest of the files
            for (let i = 0; i < data.length; i++) {
                loadSequenceContainer.push(loadSequence(i, data));
            }

            // run the load sequence
            // load sequence for all files
            Promise.all(loadSequenceContainer)
            .then(function() {
                handleSeries(this.seriesContainer);
            })
            .catch(function(error) {
                window.console.log('oops... something went wrong...');
                window.console.log(error);
            });
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-viewers-upload{
    @import "./viewers_upload.css";
}
</style>