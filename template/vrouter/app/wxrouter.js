import Router from 'vue-router'

let result = {//new Router(
    linkActiveClass: 'active',
    routes: [
        {
            path:'wxlogin',
            component:() => import('@/login.vue'),
            meta:{title:'页面登录',guest: true}
        },
         //!!!! 下面的路径配置参考文件menu.js !!!!
         {
             path:'stete',
             redirect: 'stete/state',
             component:() => import('@/home.vue'),
             children:[
                 {
                     path:'state',
                     component:() => import('@/state/state.vue'),
                     meta:{title:'状态查询',guest: true}
                 },
             ]
         },
         {
             path:'encode',
             redirect: 'encode/baseset',
             component:() => import('@/home.vue'),
             // meta:{title:'页面首页',guest: true}
             children:[
                 {
                     path:'baseset',
                     component:() => import('@/components/common/vRouter/vRouterviewcomp.vue'),
                     redirect: 'baseset/aaaset',
                     children:[
                         {
                             path:'aaaset',
                             component:() => import('@/baseset/aaaset.vue'),
                             meta:{title:'aaa设置',guest: true}
                         },
                         {
                             path:'bbbset',
                             component:() => import('@/baseset/bbbset.vue'),
                             meta:{title:'bbb设置',guest: true}
                         },
                         {
                             path:'cccet',
                             component:() => import('@/baseset/cccset.vue'),
                             meta:{title:'ccc设置',guest: true}
                         },
                     ]
                 },
                 {
                     path:'advaset',
                     redirect: 'advaset/dddset',
                     component:() => import('@/components/common/vRouter/vRouterviewcomp.vue'),//空白路由组件
                     children:[
                         {
                             path:'dddset',
                             component:() => import('@/advaset/dddset.vue'),
                             meta:{title:'ddd设置',guest: true}
                         },
                         {
                             path:'eeeset',
                             component:() => import('@/advaset/eeeset.vue'),
                             meta:{title:'eee设置',guest: true}
                         },
                         {
                             path:'fffset',
                             component:() => import('@/advaset/fffset.vue'),
                             meta:{title:'fff设置',guest: true}
                         },
                     ]
                 },
             ]
         },
         {
             path:'decode',
             redirect: 'decode/xxx',
             component:() => import('@/home.vue'),
             children:[]
         },
         {
             path:'system',
             redirect: 'system/xxx',
             component:() => import('@/home.vue'),
             children:[]
         },
    ]
}//)

// console.log(result)

export default result