import { env } from "../config/env.config"

export const metaClient = async (endPoint: string, body: unknown) => {
    return fetch(
        `https://graph.facebook.com/v20.0/${endPoint}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${env.WHATSAPP_TOKEN}`
            },
            body: JSON.stringify(body)
        }
    )
}