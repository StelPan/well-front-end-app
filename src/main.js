import {createApp} from 'vue';
import {createI18n, useI18n} from 'vue-i18n';
import uuid from "vue3-uuid";
import VueRouterMiddleware from 'vue-router-middleware';
import {createMetaManager} from "vue-meta";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import "./App.css";

import PrimeVue from 'primevue/config';

import {messages, defaultLanguage} from "./i18n";
const i18n = createI18n({
    fallbackLocale: 'en',
    globalInjection: true,
    locale: defaultLanguage,
    legacy: false,
    messages,
});

createApp(App, {
    setup() {
        const {t} = useI18n();
        return {t};
    }
})
    .use(i18n)
    .use(uuid)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(createMetaManager())
    .use(VueRouterMiddleware, {router})
    .mount('#app');