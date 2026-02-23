import { Application } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { Route } from './types';


/**
 * Setup proxies for all routes
 * @param app - Express application
 * @param routes - Array of route configurations
 */
export const setupProxies = (app: Application, routes: Route[]): void => {
    routes.forEach((route: Route) => {
        console.log(`🔗 Setting up proxy: ${route.url} -> ${route.proxy.target}`);
        route.proxy.on = {proxyReq: fixRequestBody};
        app.use(route.url, createProxyMiddleware(route.proxy));
    });
};