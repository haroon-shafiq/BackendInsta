import { env } from "../config/env.config";
import { metaClient } from "../lib/meta";

export const sendWhatsAppMessage = async (to: string, text: string): Promise<void> => {
    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to,
        type: "text",
        text: {
            preview_url: false,
            body: text,
        },
    };
    try {
        const response = await metaClient(
            `${env.PHONE_NUMBER_ID}/messages`,
            payload
        );
        if (!response.ok) {
            const errorData = await response.json();
            console.error(
                "Failed to send WhatsApp message:",
                JSON.stringify(errorData, null, 2)
            );
            return;
        }
        console.log(`Message successfully delivered to ${to}`);
    } catch (error) {
        console.error("Network error:", error);
    }
};