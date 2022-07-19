<template>
  <div class="component-chart-graph">
    <VueEcharts class="chart" :option="chartOptions" ResizeObserver
        ref="chartRef"/>
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    defineProps, defineEmits, useSlots, useAttrs, defineComponent,
    ref
 } from "vue";
import { VueEcharts } from 'vue3-echarts';
import {graphData} from "@/api/chart";

const props = defineProps({}); // eslint-disable-line

const emit = defineEmits([]); // eslint-disable-line
const slots = useSlots(); // eslint-disable-line
const attrs = useAttrs(); // eslint-disable-line
defineComponent({
    VueEcharts
})

// https://echarts.apache.org/examples/data/asset/data/webkit-dep.json
const chartRef = ref<VueEcharts>();
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
            force: {
                edgeLength: 5,
                repulsion: 20,
                gravity: 0.2
            },
            data:[],
            categories:[],
            edges:[],
            // data: webkitDep.nodes.map(function (node, idx) {
            //     node.id = idx;
            //     return node;
            // }),
            // categories: webkitDep.categories,
            // edges: webkitDep.links
        }
    ]
})

async function init(){
    const res = await graphData();
    console.log('res', res)
    const serie = chartOptions.value.series[0]
    serie.data = res.data.nodes.map(function (node, idx) {
        node.id = idx;
        return node;
    })
    serie.categories = res.data.categories
    serie.edges = res.data.links
    chartRef.value.refreshOption()
}

init()

</script>

<style lang="scss" scoped>
.component-chart-graph {
    width: 100%;
    height: 100%;
}
.chart{
    width: 100%;
    height: 100%;
}
</style>



