import { createMiddleware } from 'vue-router-middleware';

createMiddleware('redirect-to-home', (args, to, from, next) => {
    console.log(args, to, from);
    next();
});

