import { prisma } from "../config/db.config"
import { createPostInput, updatePostInput } from "../types/post.type";
import { userSelect } from "../constants/selectors";

export const createPost = async (userId: string, data: createPostInput) => {
    const post = await prisma.post.create({
        data: {
            authorId: userId,
            description: data.description || "",
            imageUrl: data.imageUrl
        }
    })
    return post;
}
export const getUserPosts = async (userId: string) => {
    const posts = await prisma.post.findMany({
        where: {
            authorId: userId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: userSelect,
            }
        }
    })
    return posts;
}
export const updateUserPost = async (userId: string, data: updatePostInput, postId: string) => {
    const post = await prisma.post.update({
        where: {
            id: postId,
            authorId: userId
        },
        data: {
            description: data.description ?? "",
            imageUrl: data.imageUrl
        }
    })
    return post;
}