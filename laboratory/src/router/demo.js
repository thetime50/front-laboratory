export default {
    path: '/demo',
    name: 'demo',
    redirect: 'demo/dicom',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'dicom',
            name: 'dicom',
            component: () => import('@/page/demo/dicom.vue')
        },
    ],
}
