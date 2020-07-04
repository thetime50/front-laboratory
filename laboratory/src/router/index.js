import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'

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
        {
            path: '/animation',
            redirect: 'animation/vue-transition',
            name: 'animation',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'vue-transition',
                    name: 'vue-transition',
                    component: () => import('@/page/animation/vueTransition.vue')
                },
            ]
        },
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
