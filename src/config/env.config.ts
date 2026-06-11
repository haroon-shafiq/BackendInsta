import { config } from "dotenv";
config();

export const env = {
    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    FRONTEND_URL: process.env.FRONTEND_URL
}