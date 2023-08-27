import { createMiddleware } from 'vue-router-middleware';
import router from "@/router";

createMiddleware('redirect-with-not-found', (args, to, from, next) => {
    router.push('/users').then(() => {});
});

