import { Router } from "express";
import * as AuthController from "../controllers/auths.controller"
import { registerValidator, loginValidator, authProviderValidator } from "../validators/auth.validator";
import { normalizeBody, validate } from "../middleware/validation.middleware";
import { upload, uploadToCloudinary } from "../middleware/multer.middleware";
const router = Router();

router.post("/register", upload.single("avatarUrl"), normalizeBody, uploadToCloudinary, registerValidator, validate, AuthController.register)
router.post("/login", loginValidator, validate, AuthController.login)
router.post("/provider", authProviderValidator, validate, AuthController.oauthLogin)


export default router