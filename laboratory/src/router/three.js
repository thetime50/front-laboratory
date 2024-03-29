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
                {
                    path: 'material',
                    name: 'material',
                    component: () => import('@/page/threejs/start/material.vue')
                },
            ],
        },
        {
            path: 'vertices-geometry',
            name: '',
            redirect: 'vertices-geometry/vertices',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'vertices',
                    name: 'vertices',
                    component: () => import('@/page/threejs/verticesGeometry/vertices.vue')
                },
                {
                    path: 'vertices-index',
                    name: 'vertices-index',
                    component: () => import('@/page/threejs/verticesGeometry/verticesIndex.vue')
                },
                {
                    path: 'objgeometry',
                    name: 'objgeometry',
                    component: () => import('@/page/threejs/verticesGeometry/objgeometry.vue')
                },
                {
                    path: 'objgeometry-face',
                    name: 'objgeometry-face',
                    component: () => import('@/page/threejs/verticesGeometry/objgeometryFace.vue')
                },
                {
                    path: 'objgeometry-data',
                    name: 'objgeometry-data',
                    component: () => import('@/page/threejs/verticesGeometry/objgeometryData.vue')
                },
                {
                    path: 'objgeometry-operation',
                    name: 'objgeometry-operation',
                    component: () => import('@/page/threejs/verticesGeometry/objgeometryOperation.vue')
                },
            ],
        },
        {
            path: 'material',
            name: '',
            redirect: 'material/common',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'common',
                    name: 'common',
                    component: () => import('@/page/threejs/material/materialCommon.vue')
                },
            ],
        },
        {
            path: 'object3d',
            name: '',
            redirect: 'object3d/object3d-operation',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'object3d-operation',
                    name: 'object3d-operation',
                    component: () => import('@/page/threejs/object3d/object3dOperation.vue')
                },
            ],
        },
        {
            path: 'light',
            name: '',
            redirect: 'light/light-common',
            component: () => import('@/page/routerviewcomp.vue'),
            children:[
                {
                    path: 'light-common',
                    name: 'light-common',
                    component: () => import('@/page/threejs/light/lightCommon.vue')
                },
            ],
        },
    ]
}