<template>
  <div class="component-chart-graph">
    <!--  -->
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    defineProps, defineEmits, useSlots, useAttrs, defineComponent,
    ref
 } from "vue";
import { VueEcharts } from 'vue3-echarts';

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
defineComponent({
    VueEcharts
})

// https://echarts.apache.org/examples/data/asset/data/webkit-dep.json
const chartOptions = ref({
    legend: {
        data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
    },
    series: [
        {
            type: 'graph',
            layout: 'force',
            animation: false,
            label: {
                position: 'right',
                formatter: '{b}'
            },
            draggable: true,
            // data: webkitDep.nodes.map(function (node, idx) {
            //     node.id = idx;
            //     return node;
            // }),
            // categories: webkitDep.categories,
            // force: {
            //     edgeLength: 5,
            //     repulsion: 20,
            //     gravity: 0.2
            // },
            // edges: webkitDep.links
        }
    ]
})

</script>

<style lang="scss" scoped>
.component-chart-graph {
  //
}
</style>



