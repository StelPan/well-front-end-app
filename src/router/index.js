import {createRouter, createWebHistory} from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
import {middleware} from "vue-router-middleware";

import "./middleware/require-auth";

import Login from "@/views/LoginView.vue";
import AboutView from "@/views/AboutView.vue";
import UsersView from "@/views/users/UsersView.vue";
import ProfileVIew from "@/views/ProfileVIew.vue";
import EditUserView from "@/views/users/EditUserView.vue";

const RouterLayout = createRouterLayout(layout => {
    return import('@/layouts/' + layout + '.vue')
});


const routes = [
    {
        path: '/',
        component: RouterLayout,
        children: [{
            path: 'about',
            name: 'About',
            component: AboutView,
        }, {
            path: 'login',
            name: 'login',
            component: Login
        },
            ...middleware('require-auth', [{
                path: 'users',
                name: 'users',
                component: UsersView
            }, {
                path: 'users/:id/edit',
                name: 'user-edit',
                component: EditUserView,
            },
                {
                path: 'profile',
                name: 'profile',
                component: ProfileVIew
            }]),
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
