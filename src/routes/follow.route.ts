import * as FollowController from "../controllers/follows.controller";
import { Router } from "express";
import { validate } from "../middleware/validation.middleware";
import { followValidaor } from "../validators/follow.validator";
import { checkAuth } from "../middleware/auth.middleware";
const router = Router();
router.use(checkAuth);
router.post("/", followValidaor, validate, FollowController.followUser);
router.get('/followers', FollowController.getFollowers)
router.get('/followings', FollowController.getFollowings)
router.delete('/', FollowController.unFollowUser)


export default router
