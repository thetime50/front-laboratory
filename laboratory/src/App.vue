<template>
  <div class="flex-layout" id="app">
    <menu-tree class="flex-none" :menu="menu" />
    <breadcrumb class="flex-none"/>
      <router-view class="flex-auto"/>
    <!-- <div class="router-wrap">
    </div> -->
  </div>
</template>

<script>
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
    }
  }
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
</style>
