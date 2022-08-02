<template>
    <div class="component-a-star flex-layout frow">
        <div class="tool flex-none"></div>
        <div class="zrader flex-auto" ref="zrRef"></div>
    </div>
</template>

<script lang="ts" setup>
/* message */
import { 
    defineProps, defineEmits, useSlots, useAttrs,
    ref,watch,
 } from "vue";

import {AStarCanvas} from "./aStarMath"

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

let zrRef = ref<HTMLElement|null>(null)

let zsc: AStarCanvas = null

watch(zrRef,()=>{
    console.log('zrRef.value', zrRef.value)
    zsc = new AStarCanvas(zrRef.value)
    console.log('zsc', zsc)
    // dispose
})

</script>

<style lang="scss" scoped>
.component-a-star {
  height: 100%;
  padding: 24px;
}
.tool{
    width: 400px;
    margin-right: 24px;
}
.zrader{
    border: 1px dashed #aaa;
}
</style>