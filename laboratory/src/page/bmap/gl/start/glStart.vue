<template>
<div class="component-gl-start">
    <div class="full-block" ref="map"></div>
</div>
</template>

<script>
/* message */
import {bmapModuleInit} from "@/js/bmap/bmap.js"

let BMapGL = null

export default {
    name: "gl-start",
    data () {
        return {
            _mp: null,
            isMouted: false,
        };
    },
    async created () {
        BMapGL = await bmapModuleInit()
        this.checkInitMap()
    },
    mounted () {
        this.$nextTick(()=>{
            this.isMouted = true
            this.checkInitMap()
        })
    },
    methods: {
        checkInitMap(){
            console.log(BMapGL)
            if(BMapGL && this.isMouted){
                this._mp = new BMapGL.Map(this.$refs.map)
                this._mp.centerAndZoom(new BMapGL.Point(121.491, 31.233), 8);
                this._mp.enableScrollWheelZoom()
            }
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-gl-start{
    
}
</style>