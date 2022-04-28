export default {
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
        {
            path: 'anime',
            name: 'anime',
            redirect: 'anime/start',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'start',
                    name: 'start',
                    component: () => import('@/page/animation/anime/start.vue')
                },
            ],
        }, {
            path: 'scroll-animate',
            name: 'scroll-animate',
            component: () => import('@/page/animation/scrollAnimate/scrollAnimate.vue')
        }, {
            path: 'vue-tilt',
            name: 'vue-tilt',
            component: () => import('@/page/animation/vueTilt/vueTilt.vue')
        },
    ]
}