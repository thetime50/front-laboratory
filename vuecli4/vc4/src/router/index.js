import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import routerviewcomp from  "@/views/routerviewcomp.vue"
import statsAnimation from  "@/views/statsAnimation/statsAnimation.vue"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'stats-animation',
    // component: Home,
    component:routerviewcomp,
    children:[
      {
        path: 'stats-animation',
        name: 'stats-animation',
        component: statsAnimation,
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
