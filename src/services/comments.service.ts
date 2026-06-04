import { prisma } from "../config/db.config"
import { userSelect } from "../constants/selectors";
import { CreateCommentData } from "../types/comment.type"


export const createComment = async (data: CreateCommentData, userId: string) => {

    const newComment = await prisma.comment.create({
        data: {
            content: data.content,
            postId: data.postId,
            authorId: userId,
            parentId: data.parentId || null
        },

        include: {
            author: {
                select: userSelect
            }
        }
    });

    return newComment;
};



export const getCommentsByPostId = async (postId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId: postId,
            parentId: null
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: { select: userSelect },
            repliesTo: {
                include: {
                    author: { select: userSelect },
                    repliesTo: {
                        include: {
                            author: { select: userSelect }
                        },
                        orderBy: { createdAt: "asc" }
                    }
                },
                orderBy: { createdAt: "asc" }
            }
        }
    });

    return comments;
};



