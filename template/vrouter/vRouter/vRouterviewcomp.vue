<template>
<v-router-view class="component-v-router-view-comp" 
    v-bind="{
        ...$props,
        ...$attrs,
    }"/>
</template>

<script>
/* v-router 路由视图组件页面 */
import vRouterView from "./vRouterView.vue"
import vRouter from "./vRouter.js"

export default {
    name: "v-router-view-comp",
    components:{
        vRouterView,
    },
    props:{
        ...vRouter.props,
    },
    data () {
        return {
        };
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-v-router-view-comp{
    
}
</style>