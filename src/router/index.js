import {createRouter, createWebHistory} from 'vue-router'
import {createRouterLayout} from 'vue-router-layout'
import {middleware} from "vue-router-middleware";

import "./middleware/require-auth";
import "./middleware/redirect-to-login";
import "./middleware/redirect-with-not-found";
import "./middleware/require-without-auth";

import Login from "@/views/LoginView.vue";
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
import ReviewsView from "@/views/reviews/ReviewsView";
import BuildingsView from "@/views/buildings/BuildingsView";
import ServicesVIew from "@/views/services/ServicesVIew";
import ServicesListView from "@/views/services/ServicesListView";
import ServiceCategoriesView from "@/views/services/ServiceCategoriesView";
import UpdateReviewView from "@/views/reviews/UpdateReviewView";
import EditTariffView from "@/views/tariffs/EditTariffView";
import TariffsListView from "@/views/tariffs/TariffsListView";
import CreateTariffView from "@/views/tariffs/CreateTariffView.vue";
import EditNoticeVIew from "@/views/notices/EditNoticeVIew.vue";
import CreateNoticeView from "@/views/notices/CreateNoticeView.vue";
import ObjectsView from "@/views/objects/ObjectsView";
import SupportView from "@/views/SupportView";
import VendorsView from "@/views/vendors/VendorsView";
import VendorsListView from "@/views/vendors/VendorsListView";
import BanksListView from "@/views/vendors/BanksListView";
import VendorView from "@/views/vendors/VendorView";
import CreateAcquiringView from "@/views/vendors/CreateAcquiringView";
import PartnersView from "@/views/partners/PartnersView";
import PartnersListView from "@/views/partners/PartnersListView";
import PartnerCategoriesView from "@/views/partners/PartnerCategoriesView";
import ServiceView from "@/views/services/ServiceView.vue";
import PartnerView from "@/views/partners/PartnerView";
import PartnerCategoryView from "@/views/partners/PartnerCategoryView";
import ServiceCategory from "@/views/services/ServiceCategory";
import CreateServiceCategory from "@/views/services/CreateServiceCategory";
import CreateVendorView from "@/views/vendors/CreateVendorView";
import CreateBuildingView from "@/views/buildings/CreateBuildingView";
import NotFound from "@/views/NotFound";
import BuildingView from "@/views/buildings/BuildingView.vue";
import BuildingPointsView from "@/views/buildings/BuildingPointsView.vue";
import CreateServiceView from "@/views/services/CreateServiceView.vue";
import CategoriesSegmentView from "@/views/buildings/CategoriesSegmentView.vue";

console.log(...middleware('require-auth', [{}]))

const RouterLayout = createRouterLayout(layout => {
    return import('@/layouts/' + layout + '.vue')
});

const routes = [
    {
        path: '/',
        name: 'base',
        component: RouterLayout,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login,
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
                path: 'notices/:id',
                name: 'notice-view',
                component: EditNoticeVIew,
            }, {
                path: 'notices/create',
                name: 'notice-create',
                component: CreateNoticeView,
            }, {
                path: 'reviews',
                name: 'reviews',
                component: ReviewsView,
            }, {
                path: 'reviews/:id',
                name: 'review-view',
                component: UpdateReviewView
            },  {
                path: 'services/:id',
                name: 'service-view',
                component: ServiceView
            }, {
                path: 'services',
                name: 'services',
                component: ServicesVIew,
                children: [{
                    path: 'categories',
                    name: 'service-categories',
                    component: ServiceCategoriesView,
                }, {
                    path: 'list/:type',
                    name: 'services-list',
                    component: ServicesListView
                },]
            },  {
                path: 'services/categories/:id',
                name: 'service-category',
                component: ServiceCategory
            }, {
                path: 'services/categories/create',
                name: 'create-service-category',
                component: CreateServiceCategory,
            }, {
                path: 'services/create',
                name: 'create-service',
                component: CreateServiceView
            }, {
                path: 'buildings',
                name: 'buildings',
                component: BuildingsView,
            }, {
                path: 'buildings/create',
                name: 'create-building',
                component: CreateBuildingView
            }, {
                path: 'buildings/:id',
                name: 'building-edit',
                component: BuildingView,
            }, {
                path: 'buildings/:id/segments/:segment',
                name: 'building-segment-edit',
                component: CategoriesSegmentView,
            }, {
                path: 'buildings/:id/points',
                name: 'building-points-edit',
                component: BuildingPointsView
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
                component: VendorsView,
                children: [{
                    path: 'list',
                    name: 'vendors-list',
                    component: VendorsListView
                }, {
                    path: 'banks',
                    name: 'vendors-banks',
                    component: BanksListView
                }]
            }, {
                path: 'vendors/:id',
                name: 'vendor-view',
                component: VendorView
            }, {
                path: 'vendors/create',
                name: 'create-vendor-view',
                component: CreateVendorView
            }, {
                path: '/banks/:id/acquiring/create',
                name: 'acquiring-create',
                component: CreateAcquiringView
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
                path: 'objects',
                name: 'objects',
                component: ObjectsView
            }, {
                path: 'partners',
                name: 'partners',
                component: PartnersView,
                children: [{
                    path: 'list',
                    name: 'partners-list',
                    component: PartnersListView
                }, {
                    path: 'categories',
                    name: 'partners-categories',
                    component: PartnerCategoriesView,
                }]
            }, {
                path: 'partners/:id',
                name: 'partner-view',
                component: PartnerView,
            }, {
                path: 'partners/categories/:id',
                name: 'partner-category-view',
                component: PartnerCategoryView
            }, {
                path: 'profile',
                name: 'profile',
                component: ProfileVIew
            }, {
                path: 'support',
                name: 'support',
                component: SupportView
            }]),
        ],
    }, {
        path: '/:pathMatch(.*)*',
        redirect: '/users'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
