<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {

  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~@/style/common.scss";
@import url("https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");
@import url('https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
  height: 100%;
}
</style>

<style lang="scss">
// .component-stats-animation{}
* {
    margin: 0;
    padding: 0;
}
a {
  text-decoration: inherit;
}
em {
  font-style: normal;
}
ul,
ol {
  list-style: none;
  padding-left: 0;
}
h1,
h2,
h3,
h4 {
  font: inherit;
}
input,
select,
button {
  font: inherit;
}
html,
body {
  height: 100%;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  height: 100%;
  overflow: hidden;
}

@keyframes flip {//图表页面图标卡片进入3d变换效果
  0% {
    opacity: 1;
    transform: translate3d(0, 50px, 0) rotateX(-90deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotateX(0deg);
  }
}
@keyframes fade { //图表页面标题进入透明度效果
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rise {//detail页面消息回复卡片进入上移效果
  0% {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes rise2 {//feedMeta.vue使用 delta页操作条内项目进入 上移效果
  0% {
    opacity: 0;
    transform: translate3d(0, 200%, 0);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes rise3 { // feedMeta.vue使用 delta页操作条进入缩放效果
  0% {
    transform: translate3d(0, 100%, 0) scale(0);
  }
  100% {
    transform: translate3d(0, -50%, 0) scale(1);
  }
}
@keyframes path { //环形进度条动画
  to {
    stroke-dasharray: 0 95;
  }
}
@keyframes path2 { //贝塞尔面积图动画
  to {
    stroke-dasharray: 0 500;
  }
}
</style>
