import { body } from "express-validator"
export const createPostValidator = [
    body("description").optional().isString(),
]
