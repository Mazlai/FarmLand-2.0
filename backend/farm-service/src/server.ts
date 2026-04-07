import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import sequelize from "./config/database";
import animalRoutes from "./routes/animal.routes";
import "./models/constraints";
import logger from "./utils/logger";
import morganMiddleware from "./utils/morganConfig";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// Routes
app.use("/", animalRoutes);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "Farm service is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(`Internal error: ${err.message}`, { stack: err.stack });
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

export { app, PORT, sequelize };
