import config from "~/config"
import Home from "~/pages/Home"
import RoleManagement from "~/pages/RoleManagement"

export const publicRoutes = [
]

export const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.roleManagement,
        component: RoleManagement,
    },
]