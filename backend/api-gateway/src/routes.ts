import { Route } from './types';

const routes: Route[] = [

    // User API service
    {
        url: "/api/users",
        proxy: {
            target: process.env.USER_SERVICE_URL || "http://localhost:3001",
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
            target: process.env.FARM_SERVICE_URL || "http://localhost:3002",
            changeOrigin: true,
            pathRewrite: {
                "^/api/farms": "/"
            }
        }
    },
    {
        url: "/api/tools",
        proxy: {
            target: process.env.FARM_SERVICE_URL || "http://localhost:3003",
            changeOrigin: true,
            pathRewrite: {
                "^/api/toos": "/"
            }
        }
    },
    // Angular frontend app
    {
        url: "/",
        proxy: {
            pathFilter: "!/api",
            target: process.env.FRONTEND_SERVICE_URL || "http://localhost:4200",
            changeOrigin: true
        }
    }

];

export default routes;