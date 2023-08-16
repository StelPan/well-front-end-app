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
import BuildingsView from "@/views/buildings/BuildingsView";
import ServicesVIew from "@/views/services/ServicesVIew";
import ServicesListView from "@/views/services/ServicesListView";
import ServiceCategoriesView from "@/views/services/ServiceCategoriesView";
import UpdateReviewView from "@/views/reviews/UpdateReviewView";
import EditTariffView from "@/views/tariffs/EditTariffView";
import TariffsListView from "@/views/tariffs/TariffsListView";
import CreateTariffView from "@/views/tariffs/CreateTariffView.vue";

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
                path: 'reviews/:id',
                name: 'review-view',
                component: UpdateReviewView
            }, {
                path: 'services',
                name: 'services',
                component: ServicesVIew,
                children: [{
                    path: 'list',
                    name: 'services-list',
                    component: ServicesListView
                }, {
                    path: 'categories',
                    name: 'service-categories',
                    component: ServiceCategoriesView,
                }]
            }, {
                path: 'buildings',
                name: 'buildings',
                component: BuildingsView,
            }, {
                path: 'users',
                name: 'users',
                component: UsersView
            }, {
                path: 'users/:id/edit',
                name: 'user-edit',
                component: EditUserView,
            }, {
                path: 'users/create',
                name: 'user-create',
                component: CreateUserView,
            }, {
                path: 'tariffs',
                name: 'tariffs',
                component: TariffsView,
                children: [{
                    path: 'list/:period/',
                    name: 'tariffs-periods-list',
                    component: TariffsListView
                }]
            }, {
                path: 'tariffs/create',
                name: 'tariff-create',
                component: CreateTariffView,
            }, {
                path: '/tariffs/:id',
                name: 'tariff-view',
                component: EditTariffView
            }, {
                path: 'vendors',
                name: 'vendors',
                component: VendorsView
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
