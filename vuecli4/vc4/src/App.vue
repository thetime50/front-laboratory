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
</style>
