import {createRouter, createWebHistory} from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
import {middleware} from "vue-router-middleware";

import "./middleware/require-auth";

import HomeView from '../views/HomeView.vue'
import Login from "@/views/admin/Login.vue";
import AboutView from "@/views/AboutView.vue";
import UsersView from "@/views/users/UsersView.vue";

const RouterLayout = createRouterLayout(layout => {
    return import('@/layouts/' + layout + '.vue')
});


const routes = [
    ...middleware('require-auth', [{
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
            path: 'login',
            name: 'login',
            component: Login
        }, {
            path: 'users',
            name: 'users',
            component: UsersView
        }],
    }])
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
