export default {
    path: '/opencv',
    redirect: 'opencv/cv-start',
    name: 'opencv',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'cv-start',
            name: 'cv-start',
            component: () => import('@/page/opencv/cvStart.vue')
        },
    ],
}