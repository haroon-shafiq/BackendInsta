import { Router } from "express";
const router = Router();
import * as UserController from "../controllers/users.controller";
import { checkAuth } from "../middleware/auth.middleware";

router.get("/", checkAuth, UserController.getAllUsers);
export default router;