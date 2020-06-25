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
            path: '/page1',
            redirect: 'page1/page1-1',
            name: 'page1',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'page1-1',
                    name: 'page1-1',
                    component: () => import('@/page/page1/page1-1.vue')
                },
            ]
        },
        
        {
            path: '*',
            component: () => import('@/page/error404.vue')
        },
    ]
})
