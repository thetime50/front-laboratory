<template>
<li class="component-menu-item  el-menu-item">
    <el-menu-item v-if="!menu.children"
        :index="menu.id"
        :route="route">
        {{menu.title}}
    </el-menu-item>
    <el-submenu v-else
        :index="menu.id">
        <template slot="title">{{menu.title}}</template>

        <template v-for="(mv,mi) in menu.children">
            <menu-item :menu="mv" 
                :path="path.concat([mv])" 
                :ipath="ipath.concat([mi])"/>
        </template>
    </el-submenu>
</li>
</template>

<script>
/* message */

export default {
    name: "menu-item",
    props:{
        menu:{required:true,},
        path:{type:Array,default:()=>[],},
        ipath:{type:Array,default:()=>[],},
    },
    data () {
        return {
        };
    },
    computed:{
        route(){
            return this.path.map(v=>v.route).join('/')
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-menu-item{
    padding: 0;
    /deep/{
        .el-submenu__icon-arrow{
            right: 5px;
        }
    }
}
</style>