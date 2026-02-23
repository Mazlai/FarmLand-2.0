import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import sequelize from "./config/database";
import userRoutes from "./routes/user.routes";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/", userRoutes);

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "User service is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("Internal error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
});

export { app, PORT, sequelize };
