import { body } from "express-validator";
const followValidaor = [
    body("followingId")
        .trim()
        .notEmpty().withMessage("followingId is required")
        .isUUID().withMessage("Invalid followingId")
]
export { followValidaor }