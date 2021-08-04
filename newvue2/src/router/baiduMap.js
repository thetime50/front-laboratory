export default {
    path: '/bmap',
    name: 'bmap',
    redirect: 'bmap/start',
    component: () => import('@/page/routerviewcomp.vue'),
    children: [
        {
            path: 'bmstart',
            name: 'bmstart',
            component: () => import('@/page/bmap/start/start.vue')
        },
        {
            path: 'gl',
            name: 'gl',
            redirect: 'gl/start',
            component: () => import('@/page/routerviewcomp.vue'),
            children: [
                {
                    path: 'glstart',
                    name: 'glstart',
                    component: () => import('@/page/bmap/gl/start/glStart.vue')
                },
            ]
        },
        {
            path: 'v30',
            name: 'v30',
            redirect: 'v30/start',
            component: () => import('@/page/routerviewcomp.vue'),
            children: [
                {
                    path: 'v30start',
                    name: 'v30start',
                    component: () => import('@/page/bmap/v30/start/v30Start.vue')
                },
            ]
        },
        {
            path: 'lite',
            name: 'lite',
            redirect: 'lite/start',
            component: () => import('@/page/routerviewcomp.vue'),
            children: [
                {
                    path: 'litestart',
                    name: 'litestart',
                    component: () => import('@/page/bmap/lite/start/liteStart.vue')
                },
            ]
        },
    ],
}
