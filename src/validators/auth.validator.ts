import { body } from "express-validator";
const registerValidator = [
    body("userName")
        .trim()
        .notEmpty().withMessage("Username is required")
        .isLength({ min: 3 }).withMessage("Name must be at least 3 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("avatarUrl")
        .optional()
]
const loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

const authProviderValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email address"),
    body("provider")
        .notEmpty().withMessage("Provider is required")
        .isString().withMessage("Provider must be a string"),
    body("providerId")
        .notEmpty().withMessage("Provider Id is required")
        .isString().withMessage("Provider Id must be a string")
]

export { registerValidator, loginValidator, authProviderValidator }