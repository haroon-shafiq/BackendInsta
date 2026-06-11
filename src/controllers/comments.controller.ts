
import * as CommentService from "../services/comments.service";
import * as PostService from "../services/posts.service";
import * as NotificationService from "../services/notifications.service"
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";
import { Request, Response } from "express";
import { CommentAction, CommentEntityType } from "../constants/CommentFields";

export const createComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await CommentService.createComment(req.body, req.user.id);
    let recipientId: string | null = null;
    if (req.body.parentId) {
        recipientId = comment.replyToUserId;
    } else {
        const postOwner = await PostService.findPostOwner(comment.postId);
        recipientId = postOwner?.authorId || null;
    }
    console.log("Comment ===>>>", comment)
    if (recipientId && recipientId !== req.user.id) {
        await NotificationService.createNotification({
            recipientId: recipientId,
            authorId: comment.authorId,
            action: req.body.parentId ? CommentAction.LIKED : CommentAction.CREATED,
            entityId: comment.id,
            entityType: CommentEntityType.COMMENT
        });
    }
    sendSucess(res, 201, "Comment created successfully", comment);
});

export const getCommentsByPostId = catchAsync(async (req: Request, res: Response) => {
    const comments = await CommentService.getCommentsByPostId(req.query.postId as string);
    console.log("Comment in the post==>>", comments)
    sendSucess(res, 200, "Comments fetched successfully", comments);
});

export const getRepliesByParentId = catchAsync(async (req: Request, res: Response) => {
    const comments = await CommentService.getRepliesByParentId(req.params.id as string);
    console.log("Get comment of replies==>>>", comments)
    sendSucess(res, 200, "Replies fetched successfully", comments);
});