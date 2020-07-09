<template>
<stat class="component-stat-circle" :title="day+' / 7'" :subtitle="sub" :axis="axis">
    <div class="stat-circle_body">
        <svg v-for="(v,i) in vals"
            :class="{ 'stat-circle_done':v===95 }">
            <circle class="stat-circle_bg"/>
            <circle class="stat-circle_path" :stroke-dasharray="v+',95'"/>
            <path class="stat-circle_make" d="M 17,10 L12,14 L 20,24"/>
        </svg>
    </div>
</stat>
</template>

<script>
/* message */
import stat from "./stat.vue"
import { WEEK_AXIS } from "./share.js"

export default {
    name: "stat-circle",
    components:{
        stat,
    },
    props:{
        points:{type:Array},
        max:{type:Number},
    },
    data () {
        const day = new Date().getDay() //星期 0-6
        return {
            day: day || 7,
            sub: 'Last Week',
            axis:WEEK_AXIS,
        };
    },
    computed:{
        vals(){
            return this.points.map((val)=>{
                return Math.round((val/this.max)*95)
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-stat-circle{
    svg{
        height: 34px;
        width: 34px;
        transform: rotate(90deg) scale(-1, -1);
        path {
            opacity: 0;
        }
    }
    .stat-circle_body {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80px;
    }
    .stat-circle_done {
        .stat-circle_path {
            stroke: #16d0a0;
        }
        .stat-circle_mark {
            stroke: #16d0a0;
            opacity: 1;
        }
    }
    .stat-circle_bg {
        cx: 17;
        cy: 17;
        r: 15;
        stroke: #efefef;
        stroke-width: 2;
        fill: none;
    }
    .stat-circle_path {
        cx: 17;
        cy: 17;
        r: 15;
        stroke: #5116d0;
        stroke-width: 2;
        stroke-linecap: round;
        fill: none;
        animation: path 2s ease reverse; //环形进度条动画
    }
    .stat-circle_mark {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;//端点样式
        stroke-linejoin: round;//拐角样式
    }
}
</style>