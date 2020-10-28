import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'
import demo from './demo.js'
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
        demo,
        // medical
        cornerstone,
        ami,
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
