import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Index environment variables from .env file
dotenv.config({path: '.env.dev'});

const sequelize = new Sequelize(
    process.env.DB_NAME ?? '',
    process.env.DB_USER ?? '',
    process.env.DB_PASSWORD ?? '',
    {
        host: process.env.DB_HOST ?? '',
        port: Number(process.env.DB_PORT ?? ''),
        dialect: "postgres"
    }
);

export default sequelize;
