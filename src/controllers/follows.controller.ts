import { NextFunction, Request, Response } from "express";
import * as FollowService from "../services/follows.service"
import * as NotificationService from "../services/notifications.service";
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";
import { AppError } from "../utils/appError";
import { FollowAction, FollowEntityType } from "../constants/FollowFields";
export const followUser = catchAsync(async (req: Request, res: Response) => {
    console.log("Request Hit", req.body.followingId)
    const result = await FollowService.followUser(req.user.id, req.body.followingId);
    console.log("User", result)
    await NotificationService.createNotification({
        recipientId: result.followingId,
        authorId: req.user.id, action: FollowAction.FOLLOW_USER, entityId: result.id, entityType: FollowEntityType.FOLLOW
    });
    sendSucess(res, 201, 'User Followed Successfully', result);
})
export const getFollowers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const followers = await FollowService.getFollowers(req.user.id);
    if (followers.length == 0) {
        return next(new AppError(409, "No followers found "));
    }
    sendSucess(res, 200, "User Followers fetched successfully", followers)
})
export const getFollowings = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const followings = await FollowService.getFollowings(req.user.id);
    if (followings.length == 0) {
        return next(new AppError(409, "No Followings found "));
    }
    sendSucess(res, 200, "User followings fetched successfully", followings);
})
export const unFollowUser = catchAsync(async (req: Request, res: Response) => {
    console.log("Hello in unfolow", req.body?.followingId, req.user.id);
    const result = await FollowService.unfollow(req.user.id, req.body.followingId);
    await NotificationService.createNotification({
        recipientId: result.followingId,
        authorId: req.user.id, action: FollowAction.UNFOLLOW_USER, entityId: result.id, entityType: FollowEntityType.UNFOLLOW
    });
    sendSucess(res, 200, "User unfollowed successfully", result);
})