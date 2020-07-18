<template>
<div class="component-breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item ><i class="el-icon-s-home" /></el-breadcrumb-item>
        <template v-for="item in bitems">
            <el-breadcrumb-item>{{item.title}}</el-breadcrumb-item> <!-- :to="{ path: item.path }" -->
        </template>
    </el-breadcrumb>
</div>
</template>

<script>
/* message */
import {menu} from "@/js/menu/menu.js"

export default {
    name: "wx-breadcrumb",
    data () {
        return {
            root:""
        };
    },
    computed:{
        bitems(){
            let result = []
            let routePath = this.$route.path.split('/').slice(1)
            let this_ = this
            let traverseChildren = function(arr, depth=0,path = []){
                arr.forEach((v,i,a) => {
                    if(v.route==routePath[depth]){
                        let itemPath = path.map(v=>v.route)
                        itemPath.unshift(this_.root)
                        itemPath.push(v.route)
                        itemPath = itemPath.join("/")
                        result.push({
                            title:v.title,
                            path:itemPath
                        })
                        if(v.children && depth < routePath.length-1){
                            traverseChildren(v.children, depth+1,path.concat(v))
                        }
                    }
                });
            }
            traverseChildren(menu)
            return result
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-breadcrumb{
    padding: 8px 20px;
    background-color: #f5f5f5;
    border-bottom: #e5e5e5 solid 1px;

    // /deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{
    //     cursor: pointer;
    // }
}
</style>