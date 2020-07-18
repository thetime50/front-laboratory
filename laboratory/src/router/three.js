export default {
    
    path: '/threejs',
    redirect: 'threejs/demo',
    name: 'threejs',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'demo',
            name: 'demo',
            redirect: 'demo/cuble',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'cuble',
                    name: 'cuble',
                    component: () => import('@/page/threejs/demo/cuble/cuble.vue')
                },
                {
                    path: 'grid',
                    name: 'grid',
                    component: () => import('@/page/threejs/demo/grid/grid.vue')
                },
            ],
        },
        {
            path: 'start',
            name: '',
            redirect: 'start/scene',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'scene',
                    name: 'scene',
                    component: () => import('@/page/threejs/start/scene.vue')
                },
                {
                    path: 'control',
                    name: 'control',
                    component: () => import('@/page/threejs/start/control.vue')
                },
                {
                    path: 'geometry',
                    name: 'geometry',
                    component: () => import('@/page/threejs/start/geometry.vue')
                },
            ],
        },
    ]
}