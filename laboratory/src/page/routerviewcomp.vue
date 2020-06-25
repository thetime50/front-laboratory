<template>
<router-view class="component-router-view" :class="classCfg" v-bind="$attrs"></router-view>
</template>

<script>
/* message */
/* 空白路由组件 */

export default {
    name: "routerviewcomp",
    data () {
        return {
        };
    },
    // created(){
    //     console.log(this.$route)
    // },
    computed:{
        classCfg(){
            return {
                ['route-'+this.$route.path.replace(/\//g,'_')]:true,
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-routerviewcomp{
    
}
</style>