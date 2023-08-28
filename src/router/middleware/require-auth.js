import { createMiddleware } from 'vue-router-middleware';
import store from "@/store";
import router from "@/router";

createMiddleware('require-auth', (args, to, from, next) => {
    // const auth = store.getters.getAuth;
    // if (!auth) {
    //     router.push('/login').then(() => {});
    //     return;
    // }

    next();
});

