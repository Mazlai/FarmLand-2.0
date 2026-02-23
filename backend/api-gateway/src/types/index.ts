import { Options } from 'http-proxy-middleware';

export interface Route {
  url: string;
  proxy: Options;
}

export interface ProxyConfig {
  target: string;
  changeOrigin: boolean;
  pathRewrite?: Record<string, string>;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  version: string;
}

export interface RouteInfo {
  endpoint: string;
  target: string;
}

export interface GatewayInfoResponse {
  message: string;
  version: string;
  endpoints: string[];
  routes: RouteInfo[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  path?: string;
}