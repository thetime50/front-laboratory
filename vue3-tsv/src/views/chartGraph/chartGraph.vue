<template>
  <div class="component-chart-graph flex-layout fcol">
    <div class="flex-mean row flex-layout frow justify-stretch">
        <div class="flex-mean">
            <echartGraph />
        </div>
        <div class="flex-mean">
            <forceDirected />
        </div>
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
    useSlots, useAttrs, defineComponent,
    // ref
 } from "vue";
import echartGraph from "./component/echartGraph.vue";
import forceDirected from "./component/forceDirected.vue";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line

defineComponent({
    echartGraph,
    forceDirected,
});

</script>

<style lang="scss" scoped>
.component-chart-graph {
    width: 100%;
    height: 100%;
}
</style>



