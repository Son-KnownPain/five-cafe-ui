import config from '~/config';
import CategoryManagement from '~/pages/CategoryManagement';
import Home from '~/pages/Home';
import RoleManagement from '~/pages/RoleManagement';

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
    {
        path: config.routes.roleManagement,
        component: RoleManagement,
    },
];
