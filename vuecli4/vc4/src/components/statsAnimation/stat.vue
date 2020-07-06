<template>
<div class="component-stat">
    <h4 class="stat_title">{{title}}</h4>
    <p class="stat_subtitle">{{subtitle}}</p>
    <slot></slot>
    <div class="stat_axis">
        <span v-for="(ax, i) in axis" :key="i">{{ax}}</span>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "stat",
    data () {
        return {
        };
    },
    props:{
        title:{type:String},
        subtitle:{type:String},
        axis:{type:Array},
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-stat{
    
}
</style>