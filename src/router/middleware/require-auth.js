import { createMiddleware } from 'vue-router-middleware';

createMiddleware('require-auth', (args, to, from, next) => {
    next();
});

