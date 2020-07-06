<template>
<div class="component-feed-stat">
    <h3 class="heading">Daily goals</h3>
    <stat-circle :points="feed.goal" :max="100"/>
    <h3 class="heading">Used focus</h3>
    <stat-chart :title="totalUsed" :points="feed.used" :max="500"/>
    <h3 class="heading">Time spent</h3>
    <stat-chart :title="totalTime+'Hours'" :points="feed.time" :max="100"/>
</div>
</template>

<script>
/* message */
import statCircle from "./statCircle.vue"
import statChart from "./statChart.vue"

export default {
    name: "feed-stat",
    components:{
        statCircle,
        statChart,
    },
    props:{
        feed:{type:Object, required:true},
    },
    data () {
        return {
        };
    },
    computed: {
        totalTime () {
            return this.feed.time.reduce((a, v) => a + v, 0)
        },
        totalUsed () {
            return this.feed.used.reduce((a, v) => a + v, 0)
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-feed-stat{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    padding-top: 88px;
    perspective: 1900px;
    
}
</style>