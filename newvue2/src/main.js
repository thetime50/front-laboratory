// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './js/directives.js'

import promise from 'es6-promise'
promise.polyfill();

import '@/js/elementPlus.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
    // components: { App },
    render: h => h(App),
    // 模板编译测试
//     template: `<div @click.middle="dbg" @mouseup="dbg('mouseup')">
// aaaaa
//   </div>`,
//     data() {
//         return {
//         }
//     },
//     methods: {
//         dbg(msg) {
//             console.log(msg)
//         }
//     }
})
