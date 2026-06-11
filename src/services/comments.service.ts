import { prisma } from "../config/db.config";
import { userSelect } from "../constants/selectors";
import { CreateCommentData } from "../types/comment.type";

export const createComment = async (data: CreateCommentData, userId: string) => {
    let parentId: string | null = null;
    let replyToUserId: string | null = null;
    let replyToCommentId: string | null = null;
    let replyToComment = null;

    if (data.parentId) {
        const targetComment = await prisma.comment.findUnique({
            where: { id: data.parentId },
            select: {
                id: true,
                parentId: true,
                authorId: true,
                content: true,
                author: { select: userSelect }
            }
        });

        if (!targetComment) throw new Error("Target comment not found");

        replyToCommentId = data.parentId;
        parentId = targetComment.parentId ?? data.parentId;
        replyToUserId = targetComment.authorId;

        replyToComment = {
            content: targetComment.content,
            author: targetComment.author
        };
    }

    const comment = await prisma.comment.create({
        data: {
            content: data.content,
            postId: data.postId,
            authorId: userId,
            parentId,
            replyToUserId,
            replyToCommentId
        },
        include: {
            author: { select: userSelect },
            replyToUser: { select: userSelect }
        }
    });

    return { ...comment, replyToComment };
};


export const getCommentsByPostId = async (postId: string) => {
    return await prisma.comment.findMany({
        where: {
            postId,
            parentId: null
        },
        orderBy: { createdAt: "desc" },
        include: {
            author: { select: userSelect },
            _count: { select: { replies: true } }
        }
    });
};

export const getRepliesByParentId = async (parentId: string) => {
    const replies = await prisma.comment.findMany({
        where: { parentId },
        orderBy: { createdAt: "asc" },
        include: {
            author: { select: userSelect },
            replyToUser: { select: userSelect }
        }
    });
    console.log("Replies===...", replies)
    const formattedReplies = [];
    for (const reply of replies) {
        let replyToComment = null;
        if (reply.replyToCommentId) {
            replyToComment = await prisma.comment.findUnique({
                where: { id: reply.replyToCommentId },
                select: {
                    id: true,
                    content: true,
                    author: { select: userSelect }
                }
            });
        }
        formattedReplies.push({
            ...reply,
            replyToComment: replyToComment
        });
    }
    return formattedReplies;
};
export const findCommentOwner = async (commentId: string) => {
    return await prisma.comment.findUnique({
        where: { id: commentId },
        select: { authorId: true }
    });
};