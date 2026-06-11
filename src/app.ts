import express from "express";
import cors from 'cors';
import { env } from "./config/env.config";
import routes from "./routes/index";

const app = express();

app.use(cors({
    origin: env.BASE_URL,
    credentials: true
}));

app.use(express.json());

app.use("/", routes);

export default app;
