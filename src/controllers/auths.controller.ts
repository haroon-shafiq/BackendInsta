import * as AuthSerivce from "../services/auths.service"
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../utils/catchAsync"
import { sendSucess } from '../utils/response';
import { authPayload } from '../types/auth.type';
export const register = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userData = { ...req.body }
    await AuthSerivce.register(userData);
    sendSucess(res, 201, "User created successfully");
})
export const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthSerivce.login(req.body);
    console.log("User: ", result.user);
    sendSucess(res, 200, "User logged in successfully", {
        user: {
            id: result.user.id,
            userName: result.user.userName,
            email: result.user.email,
            avatarUrl: result.user.avatarUrl
        },
        token: result.accessToken
    })
})

export const oauthLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authProfile: authPayload = req.body;
    const providerName = authProfile.provider || "Auth";
    const result = await AuthSerivce.authLogin(authProfile);
    sendSucess(res, 200, `${providerName} authentication successful`, {
        user: {
            id: result.user.id,
            userName: result.user.userName,
            email: result.user.email,
            avatarUrl: result.user.avatarUrl
        },
        token: result.accessToken
    });
});