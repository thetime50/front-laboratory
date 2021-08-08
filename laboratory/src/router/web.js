export default {
    path: '/web',
    redirect: 'web/shadow-dom',
    name: 'web',
    component: () => import('@/page/routerviewcomp.vue'),
    children:[
        {
            path: 'shadow-dom',
            name: 'shadow-dom',
            component: () => import('@/page/web/shadowDom/shadowDom.vue'),
        },
        {
            path: 'custom-elements',
            name: 'custom-elements',
            component: () => import('@/page/web/customElements/customElements.vue'),
        },
    ],
}