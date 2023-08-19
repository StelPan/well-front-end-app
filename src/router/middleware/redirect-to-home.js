import { createMiddleware } from 'vue-router-middleware';

createMiddleware('redirect-to-home', (args, to, from, next) => {
    alert(1);
    next();
});

