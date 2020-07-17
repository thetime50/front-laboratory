<template>
<div class="component-cuble">
    cuble
</div>
</template>

<script>
/* message */
import * as THREE from "THREE"

export default {
    name: "cuble",
    data () {
        return {
        };
    },
    created(){
        // console.log("hello")
        // console.log(Object.keys(THREE).join('\n'))
        console.log(THREE,THREE.REVISION)//118.3
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-cuble{
    
}
</style>