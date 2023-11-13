import config from "~/config"
import Home from "~/pages/Home"

export const publicRoutes = [
]

export const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
]