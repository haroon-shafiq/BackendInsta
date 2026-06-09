import { body } from "express-validator"
export const likeValidator = [
    body("classId")
        .trim()
        .notEmpty().withMessage("Class ID is required"),
    body("classType")
        .trim()
        .notEmpty().withMessage("Class Type is required")
]
export const deleteLikeValidator = [
    body("classId")
        .trim()
        .notEmpty().withMessage("Class ID is required")
]