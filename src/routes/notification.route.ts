import { Router } from "express";
import * as NotificationController from "../controllers/notifications.controller";
import { checkAuth } from "../middleware/auth.middleware";
const router = Router();
router.use(checkAuth)
router.get("/", NotificationController.getNotification);

export default router;