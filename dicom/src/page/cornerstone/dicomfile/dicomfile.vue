<template>
<div class="component-dicomfile">

    <div class="page-header">
        <h1>Example of displaying a DICOM P10 from the local file system</h1>
        <p class="lead">
            Click "Choose File" and select a DICOM P10 file on your local file system or drag and drop a DICOM P10
            file.
            <button id="toggleCollapseInfo" class="btn btn-primary" type="button">
                Click for more info
            </button>
        </p>
    </div>
    <div id="collapseInfo" class="collapse" style="display:none;">
        <p>
            This example illustrates how to use the cornerstoneWADOImageLoader to read a DICOM P10
            SOP instance from the local file system and display it in your web browser using cornerstone.
            Not all transfer syntaxes are currently supported,
            <a href="https://github.com/cornerstonejs/cornerstoneWADOImageLoader/blob/master/docs/TransferSyntaxes.md">
                click here for the full list.
            </a>
        </p>
        <P>
            NOTE: If the DICOM P10 file is multiframe, only the first frame will be displayed.  Access to
            other frames is possible by adding the query string parameter <i>frame</i> to specify which frame
            to display from a multiframe object (defaults to the first frame if not specified). <code>?frame=2</code>
        </P>
        <P>
            NOTE: Browser security prevents javascript from reading the file system directly - files must be
            chosen manually by the user via the file input element as shown in this example or via drag and drop.
        </P>
        <br>
        <br>
        <strong>Use of this example requires IE10+ or any other modern browser.</strong>
        <hr>
    </div>
    <div id="loadProgress">Image Load Progress:</div>

    <div class="row">
        <form id="form" class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-3">
                    <input type="file" id="selectFile" >
                </div>
            </div>
        </form>
    </div>
    <input type="checkbox" id="toggleModalityLUT">Apply Modality LUT</input>
    <input type="checkbox" id="toggleVOILUT">Apply VOI LUT</input>
    <br>
    <div class="row">
        <div class="col-md-6">
            <div style="width:512px;height:512px;position:relative;color: white;display:inline-block;border-style:solid;border-color:black;"
                 oncontextmenu="return false"
                 class='disable-selection noIbar'
                 unselectable='on'
                 onselectstart='return false;'
                 onmousedown='return false;'>
                <div id="dicomImage"
                     style="width:512px;height:512px;top:0px;left:0px; position:absolute">
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <span>Transfer Syntax: </span><span id="transferSyntax"></span><br>
            <span>SOP Class: </span><span id="sopClass"></span><br>
            <span>Samples Per Pixel: </span><span id="samplesPerPixel"></span><br>
            <span>Photometric Interpretation: </span><span id="photometricInterpretation"></span><br>
            <span>Number Of Frames: </span><span id="numberOfFrames"></span><br>
            <span>Planar Configuration: </span><span id="planarConfiguration"></span><br>
            <span>Rows: </span><span id="rows"></span><br>
            <span>Columns: </span><span id="columns"></span><br>
            <span>Pixel Spacing: </span><span id="pixelSpacing"></span><br>
            <span>Bits Allocated: </span><span id="bitsAllocated"></span><br>
            <span>Bits Stored: </span><span id="bitsStored"></span><br>
            <span>High Bit: </span><span id="highBit"></span><br>
            <span>Pixel Representation: </span><span id="pixelRepresentation"></span><br>
            <span>WindowCenter: </span><span id="windowCenter"></span><br>
            <span>WindowWidth: </span><span id="windowWidth"></span><br>
            <span>RescaleIntercept: </span><span id="rescaleIntercept"></span><br>
            <span>RescaleSlope: </span><span id="rescaleSlope"></span><br>
            <span>Basic Offset Table Entries: </span><span id="basicOffsetTable"></span><br>
            <span>Fragments: </span><span id="fragments"></span><br>
            <span>Min Stored Pixel Value: </span><span id="minStoredPixelValue"></span><br>
            <span>Max Stored Pixel Value: </span><span id="maxStoredPixelValue"></span><br>
            <span>Total Time: </span><span id="totalTime"></span><br>
            <span>Load Time: </span><span id="loadTime"></span><br>
            <span>Decode Time: </span><span id="decodeTime"></span><br>

        </div>
    </div>
</div>
</template>

<script>
/* message */
/**
 * 
 * https://github.com/cornerstonejs/cornerstoneTools/blob/master/examples/_includes/tool-simple-code-snippet.md
 * 4 years ago
 * 
 */
import cornerstone from "cornerstone-core"
import cornerstoneMath from "cornerstone-math"
import cornerstoneTools from "cornerstone-tools"

import dicomParser from "dicom-parser"
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'

import uids from './uids.js'
import initializeWebWorkers from '../initializeWebWorkers.js'
// console.log(cornerstone)

export default {
    name: "dicomfile",
    data () {
        return {
            loaded:false,
        };
    },
    mounted(){
        this.$nextTick(()=>{
            // initializeWebWorkers(cornerstoneWADOImageLoader)
            cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
            cornerstoneWADOImageLoader.external.dicomParser = dicomParser
            // console.log(dicomParser)
            // console.log(cornerstoneTools)

            // this function gets called once the user drops the file onto the div
            let handleFileSelect = (evt) => {
                evt.stopPropagation();
                evt.preventDefault();

                // Get the FileList object that contains the list of files that were dropped
                const files = evt.dataTransfer.files;

                // this UI is only built for a single file so just dump the first one
                file = files[0];
                const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
                this.loadAndViewImage(imageId);
            }

            function handleDragOver(evt) {
                evt.stopPropagation();
                evt.preventDefault();
                evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            }

            // Setup the dnd listeners.
            const dropZone = document.getElementById('dicomImage');
            dropZone.addEventListener('dragover', handleDragOver, false);
            dropZone.addEventListener('drop', handleFileSelect, false);


            cornerstoneWADOImageLoader.configure({
                beforeSend: function(xhr) {
                    // Add custom headers here (e.g. auth tokens)
                    //xhr.setRequestHeader('x-auth-token', 'my auth token');
                },
                useWebWorkers: true,
            });



            cornerstone.events.addEventListener('cornerstoneimageloadprogress', function(event) {
                const eventData = event.detail;
                const loadProgress = document.getElementById('loadProgress');
                loadProgress.textContent = `Image Load Progress: ${eventData.percentComplete}%`;
            });

            const element = document.getElementById('dicomImage');
            cornerstone.enable(element);

            document.getElementById('selectFile').addEventListener('change', (e)=> {
                // Add the file to the cornerstoneFileImageLoader and get unique
                // number for that file
                const file = e.target.files[0];
                const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
                console.log(imageId)
                this.loadAndViewImage(imageId);
            });

            document.getElementById('toggleModalityLUT').addEventListener('click', function() {
                const applyModalityLUT = document.getElementById('toggleModalityLUT').checked;
                console.log('applyModalityLUT=', applyModalityLUT);
                const image = cornerstone.getImage(element);
                const viewport = cornerstone.getViewport(element);
                if(applyModalityLUT) {
                    viewport.modalityLUT = image.modalityLUT;
                } else {
                    viewport.modalityLUT = undefined;
                }
                cornerstone.setViewport(element, viewport);
            });

            document.getElementById('toggleVOILUT').addEventListener('click', function() {
                const applyVOILUT = document.getElementById('toggleVOILUT').checked;
                console.log('applyVOILUT=', applyVOILUT);
                const image = cornerstone.getImage(element);
                const viewport = cornerstone.getViewport(element);
                if(applyVOILUT) {
                    viewport.voiLUT = image.voiLUT;
                } else {
                    viewport.voiLUT = undefined;
                }
                cornerstone.setViewport(element, viewport);
            });

            document.getElementById('toggleCollapseInfo').addEventListener('click', function() {
                if (document.getElementById('collapseInfo').style.display === 'none') {
                    document.getElementById('collapseInfo').style.display = 'block';
                } else {
                    document.getElementById('collapseInfo').style.display = 'none';
                }
            });
        })
    },
    methods:{
        async loadAndViewImage(imageId) {
            try {
                const element = document.getElementById('dicomImage');
                const start = new Date().getTime();
                let image = await cornerstone.loadImage(imageId)
                console.log(image)
                const stack = {
                    currentImageIdIndex: 0,
                    imageIds: [imageId],//imageIds,
                };

                const viewport = cornerstone.getDefaultViewportForImage(element, image);
                document.getElementById('toggleModalityLUT').checked = (viewport.modalityLUT !== undefined);
                document.getElementById('toggleVOILUT').checked = (viewport.voiLUT !== undefined);
                cornerstone.displayImage(element, image, viewport);

                // window.dbg=cornerstoneTools
                // console.log(cornerstoneTools.__version__)
                
                if(this.loaded === false) {
                    // cornerstoneTools.mouseInput.enable(element);
                    // cornerstoneTools.mouseWheelInput.enable(element);
                    // cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
                    // cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
                    // cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
                    // cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel

                    // cornerstoneTools.imageStats.enable(element);

                    // console.log(1,Object.keys(cornerstoneTools).length)
                    // cornerstoneTools.init(); //模块内部的cornerstone导入有问题
                    // console.log(2,Object.keys(cornerstoneTools).length)
                    // const WwwcTool = cornerstoneTools.WwwcTool;

                    // cornerstoneTools.addTool(WwwcTool)
                    // cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
                    // console.log(3,Object.keys(cornerstoneTools).length)
                    
                    // //https://github.com/cornerstonejs/cornerstoneTools/blob/master/examples/_includes/tool-simple-code-snippet.md
                    // cornerstoneTools.addStackStateManager(element, ['stack']);
                    // cornerstoneTools.addToolState(element, 'stack', stack);
                    // cornerstone.displayImage(element, image);
                    this.loaded = true;
                }

                function getTransferSyntax() {
                    const value = image.data.string('x00020010');
                    return value + ' [' + uids[value] + ']';
                }

                function getSopClass() {
                    const value = image.data.string('x00080016');
                    return value + ' [' + uids[value] + ']';
                }

                function getPixelRepresentation() {
                    const value = image.data.uint16('x00280103');
                    if(value === undefined) {
                        return;
                    }
                    return value + (value === 0 ? ' (unsigned)' : ' (signed)');
                }

                function getPlanarConfiguration() {
                    const value = image.data.uint16('x00280006');
                    if(value === undefined) {
                        return;
                    }
                    return value + (value === 0 ? ' (pixel)' : ' (plane)');
                }

                document.getElementById('transferSyntax').textContent = getTransferSyntax();
                document.getElementById('sopClass').textContent = getSopClass();
                document.getElementById('samplesPerPixel').textContent = image.data.uint16('x00280002');
                document.getElementById('photometricInterpretation').textContent = image.data.string('x00280004');
                document.getElementById('numberOfFrames').textContent = image.data.string('x00280008');
                document.getElementById('planarConfiguration').textContent = getPlanarConfiguration();
                document.getElementById('rows').textContent = image.data.uint16('x00280010');
                document.getElementById('columns').textContent = image.data.uint16('x00280011');
                document.getElementById('pixelSpacing').textContent = image.data.string('x00280030');
                document.getElementById('bitsAllocated').textContent = image.data.uint16('x00280100');
                document.getElementById('bitsStored').textContent = image.data.uint16('x00280101');
                document.getElementById('highBit').textContent = image.data.uint16('x00280102');
                document.getElementById('pixelRepresentation').textContent = getPixelRepresentation();
                document.getElementById('windowCenter').textContent = image.data.string('x00281050');
                document.getElementById('windowWidth').textContent = image.data.string('x00281051');
                document.getElementById('rescaleIntercept').textContent = image.data.string('x00281052');
                document.getElementById('rescaleSlope').textContent = image.data.string('x00281053');
                document.getElementById('basicOffsetTable').textContent = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.basicOffsetTable ? image.data.elements.x7fe00010.basicOffsetTable.length : '';
                document.getElementById('fragments').textContent = image.data.elements.x7fe00010 && image.data.elements.x7fe00010.fragments ? image.data.elements.x7fe00010.fragments.length : '';
                document.getElementById('minStoredPixelValue').textContent = image.minPixelValue;
                document.getElementById('maxStoredPixelValue').textContent = image.maxPixelValue;
                const end = new Date().getTime();
                const time = end - start;
                document.getElementById('totalTime').textContent = time + "ms";
                document.getElementById('loadTime').textContent = image.loadTimeInMS + "ms";
                document.getElementById('decodeTime').textContent = image.decodeTimeInMS + "ms";

            }catch(err){
                // alert(err);
                console.log(err)
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dicomfile{
    overflow: auto;
}
</style>