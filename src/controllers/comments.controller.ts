import * as CommentService from "../services/comments.service";
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";
import { Request, Response } from "express";

export const createComment = catchAsync(async (req: Request, res: Response) => {
    const comment = await CommentService.createComment(req.body, req.user.id);
    sendSucess(res, 201, "Comment created successfully", comment);
});

export const getCommentsByPostId = catchAsync(async (req: Request, res: Response) => {
    const comments = await CommentService.getCommentsByPostId(req.body.postId);
    sendSucess(res, 200, "Comments fetched successfully", comments);
});