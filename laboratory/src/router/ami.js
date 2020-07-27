
export default {
    path: '/ami',
    name: 'ami',
    redirect: 'ami/ami-start',
    redirect: 'ami/ami-start',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'ami-start',
            name: 'ami-start',
            component: () => import('@/page/ami/amiStart/amiStart.vue')
        },
    ],
}