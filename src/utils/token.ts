import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { UserType } from "../types/auth.type";
import { ACCESS_TOKEN_EXPIRES_IN } from "../constants/enum"
export const generateAccessToken = (user: UserType) => {
    return jwt.sign(
        {
            id: user.id
        },
        env.JWT_ACCESS_SECRET || "",
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    )
}