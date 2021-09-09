import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import three from './three.js'
import demo from './demo.js'
import css from './css.js'
import animation from './animation.js'
import opencv from './opencv.js'
import baiduMap from './baiduMap.js'
import web from './web.js'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: 'home',
        },
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/gameoflife',
            name: 'gameoflife',
            component: () => import('@/page/gameOfLife/gameOfLife.vue'),
        },
        css,
        animation,
        three,
        demo,
        opencv,
        baiduMap,
        // medical
        web,
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})

import NProgress from "nprogress"
import "nprogress/nprogress.css"
// 进度条配置项这样写
NProgress.configure({
    showSpinner: false
});
// 路由跳转前钩子函数中 - 执行进度条开始加载
router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
});
// 路由跳转后钩子函数中 - 执行进度条加载结束
router.afterEach(() => {
    NProgress.done();
});

export default router
