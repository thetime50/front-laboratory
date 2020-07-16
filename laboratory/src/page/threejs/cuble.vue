<template>
<div class="component-cuble">
    cuble
</div>
</template>

<script>
/* message */
import * as three from "three"

export default {
    name: "cuble",
    data () {
        return {
        };
    },
    created(){
        // console.log("hello")
        // console.log(Object.keys(three).join('\n'))
        console.log(three,three.REVISION)//118.3
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-cuble{
    
}
</style>