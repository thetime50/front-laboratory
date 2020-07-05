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
</style>
