import winston from "winston";
import path from "path";
import fs from "fs";
import * as appConfig from "../../package.json";

const isDev = appConfig.environment !== "production";
const logsDir = path.join(process.cwd(), "logs");

// Create logs directory if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logger = winston.createLogger({
  level: isDev ? "debug" : "error",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    // File transport for errors
    new winston.transports.File({
      filename: path.join(logsDir, "log.txt"),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
          ({ timestamp, level, message, stack }) =>
            `[${timestamp}] ${level.toUpperCase()}: ${message}${
              stack ? "\n" + stack : ""
            }`,
        ),
      ),
    }),
  ],
});

// Add console transport only in development
if (isDev) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(
          ({ timestamp, level, message }) =>
            `[${timestamp}] ${level}: ${message}`,
        ),
      ),
    }),
  );
}

export default logger;
