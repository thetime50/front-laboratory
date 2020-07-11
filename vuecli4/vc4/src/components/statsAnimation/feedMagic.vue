<template>
<canvas class="component-feed-magic" />
</template>

<script>
/* message */
import {createRenderer} from "../../helper/wasm-canvas.js"

export default {
    name: "feed-magic",
    props:{
        url:{type:String, required:true},
        play:{type:Boolean},
    },
    data () {
        return {
        };
    },
    async mounted () {
        this.$render = await createRenderer(this.$el, this.url) // nexttick?? maybe async delayed
        this.$render()
        this.$emit('ready')
    },
    watch:{
        play (val) {
            if(val){
                this.$render && this.$render(true)//paly
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-feed-magic{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}
</style>