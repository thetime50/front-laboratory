<template>
<div class="component-menu-tree" :class="ui.menu">
    <!-- <template v-if="ui.menu == 'column'">
        <div class="ex">
            <el-radio-group v-model="isCollapse" size="mini" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
        </div>
    </template> -->
    <el-menu :default-active="activeIndex" class="el-menu-demo"
        :mode=" ui.menu == 'column' ? 'vertical' : 'horizontal'" 
        :collapse="isCollapse"
        @select="menuSelected"
    >
        <template v-for="(mv,mi) in menu">
            <menu-item :menu="mv" :path="[mv]" :ipath="[mi]"/>
        </template>
    </el-menu>
</div>
</template>

<script>
/* message */
import menuItem from "./menuItem.vue"
import Common from "@/js/common.js"
import {mapState} from "vuex"

export default {
    name: "menu-tree",
    components:{
        menuItem,
    },
    props:{
        menu:{type:Array,default:[],},
    },
    data () {
        return {
            activeIndex:"2-1",
            isCollapse: true,
        };
    },
    computed: {
        ...mapState(['ui']),
    },
    methods:{
        menuSelected(index,indexPath,vm){
            this.$router.push('/'+vm.route)
            // console.log(vm.route)
        },
    },
    watch:{
        "$route.path":{
            handler(after,before){
                let path = after//.match(/^\/root\/.*/)[0]
                path = path.split('/').slice(3)

                let match = null
                Common.traverseTree({children:this.navMenus},
                    null,null,
                    (t,s,d,p,pi)=>{//遍历菜单
                        if(path.length && p.length-1 == path.length){
                            let tpath = p.slice(1).map(v=>v.route)
                            let check = tpath.reduce((tt,v,i,a)=>{//比较路径
                                return tt && (v == path[i])
                            },true)

                            if(check){
                                match=t
                            }
                        }
                    }
                )
                // console.log(match)
                if(match){
                    this.$nextTick(()=>{
                        // this.$refs.menu.open(match.id)
                        this.defaultActive = match.id
                    })
                }
            },
            // deep:true,
            immediate:true,
        },
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.component-menu-tree{
    overflow: auto;
    &.column{
        width: 200px;
        text-align: left;
        border-right: solid 1px #e6e6e6;
        padding-top: 20px;
        .el-radio-group{
            margin: 10px;
        }
        .el-menu{
            border-right: 0;
        }
        .el-menu--collapse{
            width: auto;
        }
    }
}
</style>