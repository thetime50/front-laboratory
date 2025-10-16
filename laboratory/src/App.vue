<template>
  <div class="flex-layout justify-start" :class="{frow:ui.menu=='column'}" id="app">
    <!-- 显示控制按钮 -->
    <div>
        <el-button class="menu-show-btn" type="primary" 
            :icon="'el-icon-arrow-' + (showMenu ?'left':'right')" circle plain
            @click="showMenu = !showMenu"></el-button>
    </div>
    <menu-tree class="flex-none" v-show="showMenu" :menu="menu" />
    <div class="flex-auto flex-layout  justify-start">
        <breadcrumb class="flex-none"/>
        <router-view class="flex-auto scroll-all"/>
    </div>
    <!-- <div class="router-wrap">
    </div> -->
  </div>
</template>

<script>
import {mapState} from "vuex"
import menuTree from "@/components/common/menuTree.vue"
import breadcrumb from "@/components/common/breadcrumb.vue"

import {menu} from "./js/menu/menu.js"
export default {
  name: 'App',
  components:{
    menuTree,
    breadcrumb,
  },
  data(){
    return {
      menu,
        showMenu:true,

    }
  },
  computed: {
      ...mapState(['ui']),
  },
}
</script>

<style lang="scss">
//bilibili-live-player-video-stream
@import "~@/style/common.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.menu-show-btn{
    position: absolute;
    top: 5px;
    left: 20px;
    z-index: 10;
    &.el-button.is-circle{
        padding: 4px
    }
}
</style>
