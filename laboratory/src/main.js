// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './js/directives.js'
import 'css-doodle' // 使用 CSS 绘制图案的 Web 组件
// import VueAnimateOnScroll from 'vue-animate-onscroll'
// import VueAnimateOnElScroll from 'vue-animate-onelscroll'
import VueAnimateOnElScroll from '@/js/vue-animate-onelscroll'

import promise from 'es6-promise'
promise.polyfill();

import '@/js/elementPlus.js'

Vue.use(ElementUI);
// Vue.use(VueAnimateOnScroll)
Vue.use(VueAnimateOnElScroll)

Vue.config.ignoredElements = [
    'popup-info',
    'css-doodle',
]

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
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
