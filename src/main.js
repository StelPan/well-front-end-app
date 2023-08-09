import { createApp } from 'vue'
import VueRouterMiddleware from 'vue-router-middleware'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import "./App.css";


import PrimeVue from 'primevue/config';


createApp(App)
    .use(store)
    .use(router)
    .use(PrimeVue)
    .use(VueRouterMiddleware, { router })
    .mount('#app');
