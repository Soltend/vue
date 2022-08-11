import { createRouter, createWebHistory } from 'vue-router';
import { pipeline } from './Middleware/Pipeline';

import lobbyRoutes from './Modules/Lobby';
import personalRoutes from './Modules/Personal';
import errorRoutes from './Modules/Error';

const routes = [
    lobbyRoutes,
    personalRoutes,
    errorRoutes
];

export default function (store, dictionary) {
    const router = createRouter({
        routes,
        history: createWebHistory(process.env.BASE_URL),
    });

    router.beforeEach(async (to, from, next) => {
        document.title = dictionary.global.t(`titles.${to.meta.title}`);

        if (!to.meta.middleware) {
            return next();
        }

        const middleware = to.meta.middleware;
        const context = { to, from, next, store };

        return middleware[0]({
            ...context,
            nextMiddleware: pipeline(context, middleware, 1)
        })
    });

    return router;
}