<template>
  <div class="component-chart-graph flex-layout fcol">
    <div class="flex-mean row flex-layout frow justify-stretch">
        <div class="flex-mean">
            <echartGraph />
        </div>
        <div class="flex-mean"></div>
    </div>
    <div class="flex-mean row flex-layout frow justify-stretch">
        <div class="flex-mean"></div>
        <div class="flex-mean"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    defineEmits, useSlots, useAttrs, defineComponent,
    ref
 } from "vue";
import echartGraph from "./component/echartGraph.vue";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

console.log('echartGraph', echartGraph)
defineComponent({
    echartGraph
})

</script>

<style lang="scss" scoped>
.component-chart-graph {
    width: 100%;
    height: 100%;
}
</style>



