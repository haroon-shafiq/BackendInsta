import { Request, Response } from "express";
import { env } from "../config/env.config";
import { WELCOME_MENU_MESSAGE } from "../constants/domains";
import * as sessionService from "../services/session.service";
import * as whatsappService from "../services/whatsApp.service"
import * as aiService from "../services/ai.service";


export const verifyWebhook = (req: Request, res: Response) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === env.WHATSAPP_VERIFY_TOKEN) {
        console.log('Webhook successfully verified by Meta!');
        return res.status(200).send(challenge);
    } else {
        return res.sendStatus(403);
    }
};

export const receiveMessage = async (req: Request, res: Response) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    res.sendStatus(200);
    console.log("Request from whatsapp api ", JSON.stringify(req.body, null, 2));
    const incomingMessageObj = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    console.log("Incoming message:", incomingMessageObj)
    if (!incomingMessageObj || incomingMessageObj.type !== 'text') {
        return;
    }
    const phoneNumber = incomingMessageObj.from;
    const userRawText = incomingMessageObj.text.body.trim();
    const userLowerText = userRawText.toLowerCase();
    console.log(`Incoming text from ${phoneNumber}: "${userRawText}"`)
    const userSession = sessionService.getSession(phoneNumber);
    console.log("User session===>>>", userSession);
    if (userLowerText === 'reset') {
        console.log(` Reset command triggered for user: ${phoneNumber}`);
        sessionService.resetSession(phoneNumber);
        await whatsappService.sendWhatsAppMessage(phoneNumber, WELCOME_MENU_MESSAGE);
        return;
    }
    if (userSession.state === 'PENDING') {
        if (userRawText === '1' || userRawText === '2' || userRawText === '3') {
            sessionService.updateSession(phoneNumber, {
                state: 'ACTIVE',
                selectedDomain: userRawText
            });
            const domainNames: Record<string, string> = { "1": "Software", "2": "Real Estate", "3": "Medical" };
            const activeName = domainNames[userRawText];
            const confirmationNotice = `You have successfully selected the *${activeName}* domain context. How can I assist you in this area today?`;
            await whatsappService.sendWhatsAppMessage(phoneNumber, confirmationNotice);
        } else {
            console.log(` User ${phoneNumber} sent invalid menu choice. Re-sending greeting.`);
            await whatsappService.sendWhatsAppMessage(phoneNumber, WELCOME_MENU_MESSAGE);
        }
        return;
    }
    if (userSession.state === 'ACTIVE' && userSession.selectedDomain) {
        sessionService.appendHistory(phoneNumber, { role: 'user', content: userRawText });
        console.log(`Forwarding context question to Groq (Llama 3) for domain key: ${userSession.selectedDomain}`);
        const aiReply = await aiService.generateAIResponse(
            userSession.selectedDomain,
            userSession.history,
            userRawText
        );
        sessionService.appendHistory(phoneNumber, { role: 'assistant', content: aiReply });
        await whatsappService.sendWhatsAppMessage(phoneNumber, aiReply);
        return;
    }
};
