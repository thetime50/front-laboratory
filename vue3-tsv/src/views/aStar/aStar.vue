<template>
    <div class="component-a-star flex-layout frow">
        <div class="tool flex-none">
            <template v-for="item in tools" :key="item.value">
                <div class="tool-item" :class="{active: currentTool.value === item.value}" 
                    @click="itemClick(item)">{{item.title}}</div>
            </template>
            <div class="tool-item">
                显示代价 <a-switch v-model:checked="showPriority" size="small" />
            </div>
        </div>
        <div class="zrader flex-auto" ref="zrRef"></div>
    </div>
</template>

<script lang="ts" setup>
/* message */
import { 
    defineProps, defineEmits, useSlots, useAttrs,
    ref,watch, toRaw,
    onUnmounted
 } from "vue";

import {AStarRuntime} from "./aStarMath"
import {ElementEvent} from "zrender"

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

let zrRef = ref<HTMLElement|null>(null)

let zsr: AStarRuntime = null



// tool
function wallHook(e:ElementEvent){
    if(e.target && zsr){
        let info = zsr.getZshapeInfo(e.target)
        if(info){
            zsr.setWall(info.index)
        }
    }
}
const wallController = {
    click:wallHook,
    mousedrag:wallHook,
}
function groundHook(e:ElementEvent){
    if(e.target && zsr){
        let info = zsr.getZshapeInfo(e.target)
        if(info){
            zsr.setGround(info.index)
        }
    }
}
const groundController = {
    click:groundHook,
    mousedrag:groundHook,
}
function sourceHook(e:ElementEvent){
    if(e.target && zsr){
        let info = zsr.getZshapeInfo(e.target)
        zsr.setSource(info.index)
    }
}
const sourceController = {
    click:sourceHook,
}
function targetHook(e:ElementEvent){
    if(e.target && zsr){
        let info = zsr.getZshapeInfo(e.target)
        zsr.setTarget(info.index)
    }
}
const targetController = {
    click:targetHook,
}

async function delay (ms:number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

async function zsrRun(){
    
    zsr.run()
    let rows = zsr.drawGradientRow()
    let cnt = 0
    for(let row of rows){ // eslint-disable-line
        // console.log('row', row)
        cnt += row.length
        if(cnt > 10){
            cnt=0
            await delay(50)
        }
    }
    zsr.drawPath()
}
const runController = {
    btnClick:zsrRun,
}

function runItemClick(e:ElementEvent){
    if(e.target && zsr){
        let info = zsr.getZshapeInfo(e.target)
        console.log('info', info.x,info.y,info.astarItem)
    }
}
const runZController={
    click:runItemClick,
}

function clearRes(){
    zsr.clearRes()
}

const clearResController = {
    btnClick:clearRes,
}

function clearAll(){
    zsr.clearAll()
}

const clearAllController = {
    btnClick:clearAll,
}


const tools = [
    {title:'墙',value:'wall',zcontroller:wallController},
    {title:'地面',value:'ground',zcontroller:groundController},
    {title:'起点',value:'source',zcontroller:sourceController},
    {title:'终点',value:'target',zcontroller:targetController},
    {title:'计算',value:'run',zcontroller:runZController,dcontroller:runController},
    {title:'清除计算',value:'clearRes',dcontroller:clearResController},
    {title:'清除全部',value:'clearAll',dcontroller:clearAllController},
]
const currentTool = ref(tools[0])
watch(zrRef,()=> {
    zsr = new AStarRuntime(zrRef.value)
    currentTool.value.zcontroller && zsr.addController(currentTool.value.zcontroller)
    test()
})
function test(){
    zsr.setSource(2)
    zsr.setTarget(zsr.widthCnt * (zsr.heightCnt-2) + zsr.widthCnt-2 )
    // zsr.setTarget(zsr.widthCnt * (3) + 10+2 )
}

onUnmounted(()=>{
    zsr && zsr.destroy ()
})


function itemClick(item){
    currentTool.value = item
    if(item.dcontroller?.btnClick){
        item.dcontroller.btnClick()
    }
}
watch(currentTool,  (after,before)=>{
    if(zsr){
        if(before){
            before.zcontroller && zsr.removeController(before.zcontroller)   
        }
        after.zcontroller && zsr.addController(after.zcontroller)
    }
},{immediate:true})


const showPriority = ref(true)
watch(showPriority,(val)=>{
    if(zsr){
        zsr.canvas.showPriority(val)
    }
})
</script>

<style lang="scss" scoped>
.component-a-star {
  height: 100%;
  padding: 24px;
}
.tool{
    width: 300px;
    margin-right: 24px;
}
.zrader{
    border: 1px dashed #aaa;
}
.tool-item{
    font-size: 18px;
    border-radius: 3px;
    &.active{
        background-color: #bfb;
    }
}
</style>