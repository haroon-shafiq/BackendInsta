import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import { AuthPayload } from "../types/auth.type";

export const checkAuth = catchAsync(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        throw new AppError(401, "No token provided");
    }
    try {
        const payload = jwt.verify(
            token,
            env.JWT_ACCESS_SECRET as string
        ) as AuthPayload;

        if (!payload.id) {
            throw new AppError(401, "Session Expired. Please login again");
        }
        req.user = payload;
        next();
    } catch (error) {
        throw new AppError(401, "Invalid Token");
    }
});