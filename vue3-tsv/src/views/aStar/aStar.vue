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
    ref,watch,
    onUnmounted
 } from "vue";

import {AStarRuntime} from "./aStarMath"

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

let zrRef = ref<HTMLElement|null>(null)

let zsr: AStarRuntime = null

watch(zrRef,()=>{
    zsr = new AStarRuntime(zrRef.value)
    // dispose
})

onUnmounted(()=>{
    zsr && zsr.destroy ()
})


// tool

const tools = [
    {title:'墙',value:'wall',install:wallInstall},
    {title:'地面',value:'ground',install:groundInstall},
    {title:'起点',value:'source',install:sourceInstall},
    {title:'终点',value:'target',install:targetInstall},
]
const currentTool = ref(tools[0])

function wallInstall(){
    // 
}
function groundInstall(){
    // 
}
function sourceInstall(){
    // 
}
function targetInstall(){
    // 
}

function itemClick(item){
    currentTool.value = item
}

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