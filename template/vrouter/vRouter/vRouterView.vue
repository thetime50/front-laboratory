<template>
<component class="component-v-router-view" v-if="next_comp" :is="next_comp" 
    v-bind="{
        ...$props,
        vr_handle:vr_handle_next,
        ...$attrs,
    }"
/>
</template>

<script>
/* v-router 路由视图组件 */
import vRouter from "./vRouter.js"

export default {
    name: "v-router-view",
    props:{
        ...vRouter.props,
    },
    data () {
        return {
        };
    },
    computed:{
        vr_handle_next(){
            let result = {
                ...this.vr_handle
            }
            result.index+=1
            return result
        },
        next_comp(){
            let m = this.vr_route.matched[this.vr_handle_next.index]
            return m && m.components.default
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-v-router-view{
    
}
</style>