export default {
    path: '/demo',
    name: 'demo',
    redirect: 'demo/dicom',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'dicom',
            name: 'dicom',
            component: () => import('@/page/demo/dicom/dicom.vue')
        },
        {
            path: 'dicom2d',
            name: 'dicom2d',
            component: () => import('@/page/demo/dicom2d/dicom2d.vue')
        },
    ],
}
