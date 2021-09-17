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
        }, {
            path: 'protobuf',
            name: 'protobuf',
            component: () => import('@/page/demo/protobuf/protobuf.vue')
        },{
            path:'css-doodle',
            name:'css-doodle',
            component:()=> import('@/page/demo/cssDoodle/cssDoodleDemo.vue')
        }, {
            path: 'sku',
            name: 'sku',
            component: () => import('@/page/demo/sku/sku.vue')
        },{
            path: 'vueEchartsTest',
            name: 'vueEchartsTest',
            component: () => import('@/page/demo/vueEchartsTest/vueEchartsTest.vue'),
        }
    ],
}
