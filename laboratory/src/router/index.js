import Vue from 'vue'
import Router from 'vue-router'
import home from '@/page/home/home.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/home',
            name: 'home',
            component: home
        },
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
