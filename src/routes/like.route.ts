import { Router } from "express";
import * as LikeController from "../controllers/likes.controller";
import { checkAuth } from "../middleware/auth.middleware";
import { likeValidator, deleteLikeValidator } from "../validators/like.validator";
import { validate } from "../middleware/validation.middleware";
const router = Router();
router.post("/", checkAuth, likeValidator, validate, LikeController.createLike);
router.delete("/", checkAuth, deleteLikeValidator, validate, LikeController.deleteLike);
router.get("/", checkAuth, LikeController.getAllLikes);

export default router;