import { Route } from './types';
import dotenv from 'dotenv';

// Index environment variables from .env file
dotenv.config({path: '.env'});

const routes: Route[] = [

    // User API service
    {
        url: "/api/users",
        proxy: {
            target: process.env.USER_SERVICE_URL,
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
            target: process.env.FARM_SERVICE_URL,
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
            target: process.env.FRONTEND_URL,
            changeOrigin: true
        }
    }

];

export default routes;