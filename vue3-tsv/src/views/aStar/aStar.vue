<template>
    <div class="component-a-star flex-layout frow">
        <div class="tool flex-none">
            <template v-for="item in tools" :key="item.value">
                <div class="tool-item" :class="{active: currentTool.value === item.value}" 
                    @click="itemClick(item)">{{item.title}}</div>
            </template>
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
    console.log('wallHook', e)
}
const wallController = {
    click:wallHook,
    touchmove:wallHook,
}
function groundHook(e:ElementEvent){
    console.log('groundHook', e)
}
const groundController = {
    click:groundHook,
    touchmove:groundHook,
}
function sourceHook(e:ElementEvent){
    console.log('sourceHook', e)
}
const sourceController = {
    click:sourceHook,
}
function targetHook(e:ElementEvent){
    console.log('targetHook', e)
}
const targetController = {
    click:targetHook,
}


const tools = [
    {title:'墙',value:'wall',controller:wallController},
    {title:'地面',value:'ground',controller:groundController},
    {title:'起点',value:'source',controller:sourceController},
    {title:'终点',value:'target',controller:targetController},
]
const currentTool = ref(tools[0])
watch(zrRef,()=>{
    zsr = new AStarRuntime(zrRef.value)
    zsr.addController(toRaw(currentTool.value.controller))
})

onUnmounted(()=>{
    zsr && zsr.destroy ()
})


function itemClick(item){
    currentTool.value = item
}
watch(currentTool,  (after,before)=>{
    if(zsr){
        if(before){
            zsr.removeController(toRaw(before.controller))   
        }
        zsr.addController(toRaw(after.controller))
    }
},{immediate:true})

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