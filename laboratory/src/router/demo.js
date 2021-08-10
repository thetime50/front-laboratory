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
        }, {
          path: 'clientjs',
          name: 'clientjs',
          component: () => import('@/page/demo/clientjs/clientjs.vue')
        }, {
            path: 'qs',
            name: 'qs',
            component: () => import('@/page/demo/qs/qs.vue')
        },
    ],
}
