import { Router } from "express";
import authRoutes from "./auth.route"
import followRoutes from "./follow.route"
import postRoutes from "./post.route"
import commentRoutes from "./comment.route"
import likeRoutes from "../routes/like.route";
import userRoutes from "../routes/user.route"
import notificationRoutes from "../routes/notification.route"
import whatsAppRoutes from "../routes/whatsApp.route";
import { errorHandlder } from "../middleware/error.middleware";
const router = Router();
router.use("/v1/auth", authRoutes)
router.use("/v1/follow", followRoutes)
router.use("/v1/posts", postRoutes)
router.use("/v1/comments", commentRoutes)
router.use("/v1/likes", likeRoutes)
router.use("/v1/users", userRoutes)
router.use("/v1/notifications", notificationRoutes);
router.use(whatsAppRoutes)
// router.use("/", whatsAppRoutes)
router.use(errorHandlder)

export default router; 