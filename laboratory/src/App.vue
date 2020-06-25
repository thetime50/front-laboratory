<template>
  <div id="app">
    <menu-tree :menu="mainMenu" />
    <router-view/>
  </div>
</template>

<script>
import menuTree from "@/components/common/menuTree.vue"
import {mainMenu} from "./js/mainMenu.js"
export default {
  name: 'App',
  components:{
    menuTree
  },
  data(){
    return {
      mainMenu,
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
