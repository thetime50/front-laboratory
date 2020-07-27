import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import three from './three.js'
import demo from './demo.js'
import animation from './animation.js'
import opencv from './opencv.js'
import cornerstone from './cornerstone.js'
import ami from './ami.js'

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
        cornerstone,
        ami,
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
