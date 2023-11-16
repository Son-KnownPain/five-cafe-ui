import config from '~/config';
import EmployeeManagement from '~/pages/EmployeeManagement';
import Home from '~/pages/Home';

export const publicRoutes = [];

export const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.employeeManagement,
        component: EmployeeManagement,
    },
];
