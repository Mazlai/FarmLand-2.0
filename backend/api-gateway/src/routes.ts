import { Route } from './types';

const routes: Route[] = [

    // User API service
    {
        url: "/api/users",
        proxy: {
            target: process.env.USER_SERVICE_URL || "http://user_service:3001",
            changeOrigin: true,
            pathRewrite: {
                "^/api/users": "/"
            }
        }
    },

    // Farm API service
    {
        url: "/api/farms",
        proxy: {
            target: process.env.FARM_SERVICE_URL || "http://farm_service:3002",
            changeOrigin: true,
            pathRewrite: {
                "^/api/farms": "/"
            }
        }
    },

    // Angular frontend app
    {
        url: "/",
        proxy: {
            pathFilter: "!/api",
            target: process.env.FRONTEND_SERVICE_URL || "http://angular_app:4200",
            changeOrigin: true
        }
    }

];

export default routes;