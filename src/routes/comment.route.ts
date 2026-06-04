import * as CommentController from "../controllers/comments.controller";
import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware";
import { createCommentValidator, getCommentsValidator } from "../validators/comment.validator";
import { validate } from "../middleware/validation.middleware";
const router = Router();
router.use(checkAuth)
router.post('/', createCommentValidator, validate, CommentController.createComment)
router.get('/', getCommentsValidator, validate, CommentController.getCommentsByPostId)
export default router
