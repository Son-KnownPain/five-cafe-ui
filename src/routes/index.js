import config from '~/config';
import CategoryManagement from '~/pages/CategoryManagement';
import Home from '~/pages/Home';

export const publicRoutes = [];

export const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.categoryManagement,
        component: CategoryManagement,
    },
];
