export default {
    path: '/css',
    name: 'css',
    redirect: 'css/tailwindcss',
    component: () => import('@/page/routerviewcomp.vue'),
    children: [
        {
            path: 'tailwindcss',
            name: 'tailwindcss',
            component: () => import('@/page/css/tailwindcss/tailwindcss.vue'),
        },
    ]
}