import {createRouter, createWebHistory} from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
import {middleware} from "vue-router-middleware";

import "./middleware/require-auth";

import Login from "@/views/LoginView.vue";
import AboutView from "@/views/AboutView.vue";
import UsersView from "@/views/users/UsersView.vue";
import ProfileVIew from "@/views/ProfileVIew.vue";
import EditUserView from "@/views/users/EditUserView.vue";
import CreateUserView from "@/views/users/CreateUserView.vue";
import StateConstructorView from "@/views/state-constructor/StateConstructorView.vue";
import CounterpartiesView from "@/views/counterparties/CounterpartiesView";
import CreateCounterpartyView from "@/views/counterparties/CreateCounterpartyView";
import NotificationsView from "@/views/notifications/NotificationsView";
import NotificationView from "@/views/notifications/NotificationView";
import NoticesView from "@/views/notices/NoticesView";
import TariffsView from "@/views/tariffs/TariffsView";
import VendorsView from "@/views/vendors/VendorsView";
import ReviewsView from "@/views/reviews/ReviewsView";

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
                path: 'notifications',
                name: 'notifications',
                component: NotificationsView,
            }, {
                path: 'notifications/:id',
                name: 'notification-view',
                component: NotificationView,
            }, {
                path: 'notices',
                name: 'notices',
                component: NoticesView
            }, {
                path: 'reviews',
                name: 'reviews',
                component: ReviewsView,
            }, {
                path: 'users',
                name: 'users',
                component: UsersView
            }, {
                path: 'users/:id/edit',
                name: 'user-edit',
                component: EditUserView,
            }, {
                path: 'tariffs',
                name: 'tariffs',
                component: TariffsView
            }, {
                path: 'vendors',
                name: 'vendors',
                component: VendorsView
            }, {
                path: 'users/create',
                name: 'user-create',
                component: CreateUserView,
            }, {
                path: 'state-constructor',
                name: 'state-constructor',
                component: StateConstructorView
            }, {
                path: 'counterparties',
                name: 'counterparties',
                component: CounterpartiesView
            }, {
                path: 'counterparties/create',
                name: 'counterparty-create',
                component: CreateCounterpartyView
            }, {
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
