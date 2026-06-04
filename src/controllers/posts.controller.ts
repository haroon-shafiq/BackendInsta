import { Request, Response } from "express";
import * as PostService from "../services/posts.service";
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";
export const createPost = catchAsync(async (req: Request, res: Response) => {
    await PostService.createPost(req.user.id, req.body);
    sendSucess(res, 201, "Post created Successfully")
})
export const getUserPosts = catchAsync(async (req: Request, res: Response) => {
    const posts = await PostService.getUserPosts(req.user.id)
    sendSucess(res, 200, "User posts fetched successfully", posts)
})
export const updateUserPost = catchAsync(async (req: Request, res: Response) => {
    const postId = req.params.id as string;
    const data = req.body;
    const posts = await PostService.updateUserPost(req.user.id, data, postId);

    sendSucess(res, 200, "Post updated successfully", posts)
})
