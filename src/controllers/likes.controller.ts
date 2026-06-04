import { Request, Response } from "express";
import * as LikeService from "../services/likes.service";
import { sendSucess } from "../utils/response";
import { catchAsync } from "../utils/catchAsync";
export const createLike = catchAsync(async (req: Request, res: Response) => {
    const result = await LikeService.createLike(req.user.id, req.body);
    sendSucess(res, 201, "Like Created Successfully", result);
});
export const deleteLike = catchAsync(async (req: Request, res: Response) => {
    const result = await LikeService.deleteLike(req.user.id, req.body);
    sendSucess(res, 200, "Like Deleted Successfully", result);
});
export const getAllLikes = catchAsync(async (req: Request, res: Response) => {
    const result = await LikeService.getAllLikes();
    sendSucess(res, 200, "Likes Fetched Successfully", result);
});
