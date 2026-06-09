import * as PostController from "../controllers/posts.controller";
import { Router } from "express";
import { checkAuth } from "../middleware/auth.middleware";
import { upload, uploadToCloudinary } from "../middleware/multer.middleware";
import { createPostValidator } from "../validators/post.validator";
import { normalizeBody, validate } from "../middleware/validation.middleware";
const router = Router();
router.use(checkAuth)
router.post('/', upload.single('imageUrl'), normalizeBody, uploadToCloudinary, createPostValidator, validate, PostController.createPost);
router.get('/', PostController.getUserPosts);
router.put('/:id', upload.single('imageUrl'), normalizeBody, uploadToCloudinary, createPostValidator, validate, PostController.updateUserPost);
router.get("/getall", PostController.getAllPosts)
export default router