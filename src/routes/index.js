import config from '~/config';
import CategoryManagement from '~/pages/CategoryManagement';
import Home from '~/pages/Home';
import RoleManagement from '~/pages/RoleManagement';
import BillStatusManagement from '~/pages/Bills-Status-Management/BillStatusManagement';
import ShiftManagement from '~/pages/ShiftManagement';
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
    {
        path: config.routes.billstatusManagement,
        component: BillStatusManagement,
    },

    {
        path: config.routes.shiftManagement,
        component: ShiftManagement,
    },
];
