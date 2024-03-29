import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/rubikCube',
    name: 'rubikCube',
    component: () => import('../views/rubikCube/rubikCube.vue')
  },
  {
    path: '/chartGraph',
    name: 'chartGraph',
    component: () => import('../views/chartGraph/chartGraph.vue')
  },
  {
    path: '/aStar',
    name: 'aStar',
    component: () => import('../views/aStar/aStar.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
