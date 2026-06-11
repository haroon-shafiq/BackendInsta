import { followers } from './../services/follows.service';
import { PostAction, PostEntityType } from './../constants/PostFields';
import { Request, Response } from "express";
import * as PostService from "../services/posts.service";
import * as UserService from "../services/users.service"
import * as FollowService from "../services/follows.service"
import * as NotificationService from "../services/notifications.service"
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";

export const createPost = catchAsync(async (req, res) => {
    const post = await PostService.createPost(
        req.user.id,
        req.body
    );
    const followers = await FollowService.getFollowersIds(req.user?.id);
    console.log("Followers", followers);
    await NotificationService.createManyNotifications(
        followers.map((follower) => ({
            recipientId: follower.followerId,
            authorId: req.user.id,
            action: PostAction.CREATED,
            entityId: post.id,
            entityType: PostEntityType.POST,
        }))
    );

    sendSucess(
        res,
        201,
        "Post created successfully",
        post
    );
});
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
export const getAllPosts = catchAsync(async (req: Request, res: Response) => {
    const posts = await PostService.getAllPosts(req.user.id);
    sendSucess(res, 200, "All posts fetched successfully", posts)
})
