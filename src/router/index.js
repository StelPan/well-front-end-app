import { createRouter, createWebHistory } from 'vue-router'
import { createRouterLayout } from 'vue-router-layout'

import HomeView from '../views/HomeView.vue'
import Login from "@/views/admin/Login.vue";
import AboutView from "@/views/AboutView.vue";

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
});

const routes = [{
  path: '/',

  component: RouterLayout,

  children: [{
    path: 'home',
    name: 'Home',
    component: HomeView
  }, {
    path: 'about',
    name: 'About',
    component: AboutView,
  }, {
    path: 'admin/login',
    name: 'AdminLogin',
    component: Login
  }],
}];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  export default router
