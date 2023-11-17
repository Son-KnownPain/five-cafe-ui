import config from '~/config';
import EmployeeManagement from '~/pages/EmployeeManagement';
import Home from '~/pages/Home';
import CategoryManagement from '~/pages/CategoryManagement';
import RoleManagement from '~/pages/RoleManagement';

export const publicRoutes = [];

export const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.employeeManagement,
        component: EmployeeManagement,
        path: config.routes.categoryManagement,
        component: CategoryManagement,
    },
    {
        path: config.routes.roleManagement,
        component: RoleManagement,
    },
];
