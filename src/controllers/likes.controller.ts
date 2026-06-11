import { Request, Response } from "express";
import * as LikeService from "../services/likes.service";
import * as NotificationService from "../services/notifications.service";
import * as CommentService from "../services/comments.service"
import * as PostService from "../services/posts.service";
import { sendSucess } from "../utils/response";
import { catchAsync } from "../utils/catchAsync";
import { LikeAction, LikeEntityType } from "../constants/LikeFields";
export const createLike = catchAsync(async (req: Request, res: Response) => {
    const result = await LikeService.createLike(req.user.id, req.body);
    let recipientId: string | null = null;
    let notificationAction = "Like Created";
    if (req.body.classType == "COMMENT") {
        const commentOwner = await CommentService.findCommentOwner(result.classId);
        recipientId = commentOwner?.authorId || null;
        notificationAction = "Comment Liked";
    }
    else {
        const postOwner = await PostService.findPostOwner(result.classId);
        recipientId = postOwner?.authorId || null;
        notificationAction = "Post Liked";
    }
    if (recipientId && recipientId !== req.user.id) {
        await NotificationService.createNotification({
            recipientId: recipientId,
            authorId: result.userId,
            action: notificationAction,
            entityId: result.id,
            entityType: req.body.classType
        });
    }
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
