import { Router } from "express";
import * as WhatsAppController from "../controllers/whatsApp.controller";

const router = Router();
router.get('/', WhatsAppController.verifyWebhook);
router.post('/', WhatsAppController.receiveMessage);

export default router;
