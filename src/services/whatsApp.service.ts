import { env } from "../config/env.config";

export const sendWhatsAppMessage = async (to: string, text: string): Promise<void> => {
    const url = `https://graph.facebook.com/v20.0/${env.PHONE_NUMBER_ID}/messages`;
    console.log(" Request URL being used is:", url);
    const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: to,
        type: "text",
        text: {
            preview_url: false,
            body: text
        }
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WHATSAPP_TOKEN}`
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Failed to send WhatsApp message. Meta API Error:", JSON.stringify(errorData, null, 2));
        } else {
            console.log(` Message successfully delivered to ${to}`);
        }
    } catch (error) {
        console.error("Network error inside whatsapp.service:", error);
    }
};
