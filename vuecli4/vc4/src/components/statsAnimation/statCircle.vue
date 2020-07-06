<template>
<stat class="component-stat-circle" :title="day+' / 7'" :subtitle="sub" :axis="axis">
    <div class="stat-circle_body">
        stat-circle
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
            return this.opints.map((val)=>{
                return Math.round((val/this.max)*95)
            })
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-stat-circle{
    
}
</style>