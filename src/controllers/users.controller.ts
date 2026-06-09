import { catchAsync } from "../utils/catchAsync";
import * as UserService from "../services/users.service";
import { Request, Response } from "express";
import { sendSucess } from "../utils/response";

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    console.log("reques", req.user?.id)
    const result = await UserService.getAllUsers(req.user.id);

    sendSucess(res, 200, "Users fetched", result);
});