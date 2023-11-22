import config from '~/config';
import EmployeeManagement from '~/pages/EmployeeManagement';
import Home from '~/pages/Home';
import CategoryManagement from '~/pages/CategoryManagement';
import RoleManagement from '~/pages/RoleManagement';
import BillStatusManagement from '~/pages/BillStatusManagement/BillStatusManagement';
import ShiftManagement from '~/pages/ShiftManagement';
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
    {
        path: config.routes.categoryManagement,
        component: CategoryManagement,
    },
    {
        path: config.routes.roleManagement,
        component: RoleManagement,
    },
    {
        path: config.routes.billStatusManagement,
        component: BillStatusManagement,
    },

    {
        path: config.routes.shiftManagement,
        component: ShiftManagement,
    },
];
