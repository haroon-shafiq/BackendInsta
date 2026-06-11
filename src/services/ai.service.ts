import OpenAI from "openai";

import { DOMAINS } from "../constants/domains";
import { ChatMessage } from "./session.service";
import { groqClient } from "../config/ai.config";

export const generateAIResponse = async (domainKey: string, conversationHistory: ChatMessage[], incomingMessage: string): Promise<string> => {
    try {
        const activeDomain = DOMAINS[domainKey];
        if (!activeDomain) {
            return "System Error: Selected domain context was not found.";
        }
        const messagesPayload: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: activeDomain.systemPrompt },
            ...conversationHistory,
            { role: "user", content: incomingMessage }
        ];

        const completion = await groqClient.chat.completions.create({
            messages: messagesPayload,
            model: "llama-3.1-8b-instant",
            temperature: 0.2,
            max_tokens: 500
        });
        console.log("Completion::", completion);

        return completion.choices[0]?.message?.content || "Please try again.";

    } catch (error) {
        console.error(" Error generating response inside ai.service:", error);
        return "Please try again.";
    }
};
