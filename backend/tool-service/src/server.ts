import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./config/database";
import animalRoutes from "./routes/animal.routes"; 
import './models/constraints';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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
  console.error("Internal error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

export { app, PORT, sequelize };
