<template>
<div class="component-dummy-cell" v-resize:throttle.10="onResize">
    <div>dummy-cell</div>
    <div>
        width:{{width}} <br>
        height:{{height}}
    </div>
    <div>
        <slot/>
    </div>
</div>
</template>

<script>
/* message */

export default {
    name: "dummy-cell",
    data () {
        return {
            width:0,
            height:0,
        };
    },
    mounted(){
        this.$nextTick(()=>{
            // console.log(this.$el.clientWidth)
            // this.width = this.$el.clientWidth
            // this.height = this.$el.clientHeight
        })
    },
    methods:{
        onResize(e){
            this.width = e.clientWidth
            this.height = e.clientHeight
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-dummy-cell{
    width: 100%;
    height: 100%;
}
</style>