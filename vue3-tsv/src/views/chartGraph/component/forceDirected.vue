<template>
  <div class="component-echart-graph">
    <VueEcharts
      class="chart"
      :option="chartOptions"
      ResizeObserver
      ref="chartRef"
      @mousedown="handleMouseDown"
      @mouseover="handleMouseUp"
      @mouseup="handleMouseUp"
    />
      <!-- @mousemove="handleMouseMove" -->
  </div>
</template>

<script setup lang="ts">
/* message */
import {
    defineEmits, useSlots, useAttrs, defineComponent,
    ref,
    onMounted,
    nextTick,
    onBeforeUnmount
 } from "vue";
import { VueEcharts } from 'vue3-echarts';
// import {data} from "./forceDirectedData";
// import {cloneDeep}from "lodash"
import {
    Node,
    Edge,
    Result,
    ForceDirectedLayout,
    ForceDirectedLayout_1
} from "./forceDirectedGraph"
import { ZRRawEvent } from "echarts"

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
    grid:{
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '3%',
        containLabel: true
    },
    legend: {
        data: ['HTMLElement', 'WebGL', 'SVG', 'CSS', 'Other']
    },
    series: [
        {
            type: 'graph',
            layout: 'none',
            animation: false,
            symbolSize: 20,
            label: {
                position: 'right',
                formatter: '{b}'
            },
            draggable: true,
            roam: 'scale',
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

let CANVAS_WIDTH = 1000,CANVAS_HEIGHT = 1000;

let fdLayout: ForceDirectedLayout = undefined
onMounted(async () => {
    await nextTick();
    // console.log('chartRef.value', chartRef.value)
    
    //generate nodes and edges
    //随机生成坐标. Generate coordinates randomly.
    const initialSize = 40.0; // initialSize 随机范围
    const initialX = CANVAS_WIDTH * .5, initialY = CANVAS_HEIGHT * .5; // 屏幕中心
    let mNodeList: Array<Node> = []
    let mEdgeList: Array<Edge> = []
    for (let i = 0; i < 20; i++) {
        mNodeList.push(new Node(
            i,
            initialX + initialSize * (Math.random() - .5),
            initialY + initialSize * (Math.random() - .5),
        )); // 生成节点
    }

    for (let i = 0; i < 20; i++) {
        const edgeCount = Math.random() * 8 + 1; // 和最多8个元素相连
        for (let j = 0; j < edgeCount; j++) {
            const targetId = Math.floor(Math.random() * 20);
            const edge = new Edge(i, targetId);
            mEdgeList.push(edge); // 生成边
        }
    }

    fdLayout = new ForceDirectedLayout_1(
        mNodeList,
        mEdgeList,
        (res: Result)=>{
            const serie = chartOptions.value.series[0]
            serie.data = res.nodes
            serie.edges = res.links

            // console.log('dragNode', JSON.stringify( serie.data.find(v=> v.id == (dragNode && dragNode.id))))
            chartRef.value.refreshOption()
        },
        ()=>{
            return [
                chartRef.value.$el.clientWidth,
                chartRef.value.$el.clientHeight
            ]
        }
    )
    fdLayout.grapthUpdate()
    chartRef.value.chart.on('mousemove', handleMouseMove)
})

function handleMouseDown(e: ZRRawEvent) {
    if(e.dataType == 'node'){
        fdLayout?.handleMouseDown(e.data)
    }
}

function handleMouseMove(e: ZRRawEvent) {
    const trans = chartRef.value.chart.convertFromPixel({ seriesIndex: 0 }, [e.event.offsetX, e.event.offsetY])
    fdLayout?.handleMouseMove([trans[0],trans[1]])
}

function handleMouseUp(e: ZRRawEvent) {
    fdLayout?.handleMouseUp(e.data)
}
onBeforeUnmount(()=>{
    fdLayout?.destroy()
})

</script>

<style lang="scss" scoped>
.component-echart-graph {
  width: 100%;
  height: 100%;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>



