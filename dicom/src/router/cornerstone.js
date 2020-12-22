export default {
    path: '/cornerstone',
    redirect: 'cornerstone/dicomfile',
    name: 'cornerstone',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'dicomfile',
            name: 'dicomfile',
            component: () => import('@/page/cornerstone/dicomfile/dicomfile.vue')
        },
    ],
}