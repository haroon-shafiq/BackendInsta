import { body, query } from "express-validator";
const createCommentValidator = [
    body("content")
        .trim()
        .notEmpty().withMessage("Comment is required"),
    body("postId")
        .trim()
        .notEmpty().withMessage("Post ID is required"),
    body("parentId")
        .optional()
        .trim()
        .notEmpty().withMessage("Parent ID is required")
]
const getCommentsValidator = [
    query("postId")
        .trim()
        .notEmpty().withMessage("Post ID is required")
]
export { createCommentValidator, getCommentsValidator }