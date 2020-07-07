<template>
<stat class="component-stat-chart" :title="title" :subtitle="sub">
    <div class="state-chart_body">
        <svg ref="chart">
            <linearGradient y1="0" x1="0" y2="1" x2="0" id="gradient">
                <stop stop-color="#5116d0" offset="0" stop-opacity="0.5"/>
                <stop stop-color="#5116d0" offset="1" stop-opacity="0"/>
            </linearGradient>
            <path class="stat-chart_bg" ref="bg"/>
            <path class="stat-chart_path" ref="path" />
        </svg>
    </div>
</stat>
</template>

<script>
/* message */
import stat from "./stat.vue"
import { renderBezierCurve } from '../../helper/svg-chart.js'
import { MONTH_AXIS } from './share.js'

export default {
    name: "stat-chart",
    components:{
        stat,
    },
    props: {
        title: {type: String},
        points: {type: Array},
        max: {type: Number}
    },
    data () {
        return {
            sub: 'Last 6 Month',
            axis: MONTH_AXIS
        };
    },
    mounted () {
        // nexttick ??
        const c = this.$refs.chart
        const w = c.scrollWidth
        const h = c.scrollHeight
        const s = w / 6
        const points = [
            [-1 * s + s / 2, h],
            ...this.vals.map((p, i) => {
                return [i * s + s / 2, p]
            }),
            [6 * s + s / 2, h]
        ]
        const curve = renderBezierCurve(points) //贝塞尔参数计算 3阶
        this.$refs.path.setAttribute('d', `M ${points[0]} ${curve}`)
        this.$refs.bg.setAttribute('d', `M 0,${h} ${curve} L ${w},${h}`)
    },
    computed:{
        vals(){
            return this.points.map((v,i,a)=>{
                return 80-Math.round((v/this.max)*80)
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-stat-chart{
    svg{
        width: 100%;
        height: 80px;
    }
    .stat-chart_bg{
        stroke: none;
        fill: url(#gradient);
    }
    .stat-chart_path{
        stroke: #5116d0;
        stroke-dasharray: 500 500;//虚线边线间隔长度
        fill: none;
        stroke-width: 2;
        stroke-linecap: miter;
        animation: path2 2s ease reverse; //贝塞尔面积图动画
    }
}
</style>