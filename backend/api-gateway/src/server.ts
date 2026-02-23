import express, { Application, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { setupProxies } from './proxy';
import routes from './routes';
import { 
  HealthCheckResponse, 
  GatewayInfoResponse, 
  ErrorResponse, 
  RouteInfo 
} from './types';

interface ServerConfig {
  app: Application;
  PORT: number;
}

export const createServer = (): ServerConfig => {
  const app: Application = express();
  const PORT: number = parseInt(process.env.PORT || '3000', 10);

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // Setup dynamic proxies
  setupProxies(app, routes);

  // Health check endpoint
  app.get('/health', (req: Request, res: Response<HealthCheckResponse>) => {
    res.json({
      status: 'API Gateway is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  });

  // Root endpoint with available routes
  app.get('/', (req: Request, res: Response<GatewayInfoResponse>) => {
    const availableRoutes: RouteInfo[] = routes.map((route) => ({
      endpoint: route.url,
      target: route.proxy.target as string,
    }));

    res.json({
      message: 'Farm Management API Gateway',
      version: '1.0.0',
      endpoints: [
        'GET /health - Health check',
        ...availableRoutes.map(
          (route) => `${route.endpoint} - Proxied to ${route.target}`,
        ),
      ],
      routes: availableRoutes,
    });
  });

  // Global error handling middleware
  const errorHandler: ErrorRequestHandler = (
    err: Error, 
    req: Request, 
    res: Response<ErrorResponse>, 
    next: NextFunction
  ): void => {
    console.error('Gateway Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'An unexpected error occurred in the API Gateway',
    });
  };

  app.use(errorHandler);

  return { app, PORT };
};