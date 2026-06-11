import OpenAI from "openai";
import { env } from "./env.config";

export const groqClient = new OpenAI({
    apiKey: env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1"
});
