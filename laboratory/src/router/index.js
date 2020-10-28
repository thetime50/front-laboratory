import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import three from './three.js'
import demo from './demo.js'
import animation from './animation.js'
import opencv from './opencv.js'

Vue.use(Router)

export default new Router({
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
        animation,
        three,
        demo,
        opencv,
        // medical
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
