import {createApp} from 'vue';
import {createI18n} from 'vue-i18n';
import uuid from "vue3-uuid";
import VueRouterMiddleware from 'vue-router-middleware';
import {createMetaManager} from "vue-meta";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import "./App.css";

import PrimeVue from 'primevue/config';

import * as Messages from "./i18n";
const {messages, defaultLanguage} = Messages;
const i18n = createI18n({
    messages: {
        ru: {
            errors: {
                email: 'Неверно указан email'
            }
        }
    },
    fallbackLocale: 'en',
    legacy: false,
    locale: defaultLanguage,
});

createApp(App)
    .use(i18n)
    .use(uuid)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(createMetaManager())
    .use(VueRouterMiddleware, {router})
    .mount('#app');