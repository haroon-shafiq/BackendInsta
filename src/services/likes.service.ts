import { userSelect } from './../constants/selectors';
import { prisma } from "../config/db.config";
import { CreateLikeData } from "../types/like.type";

export const createLike = async (userId: string, data: CreateLikeData) => {
    const like = await prisma.like.upsert({
        where: {
            userId_classId: {
                userId,
                classId: data.classId
            }
        },

        update: {},
        create: {
            userId,
            classId: data.classId,
            classType: data.classType
        },
        include: {
            user: { select: userSelect }
        }
    });

    return like;
};

export const deleteLike = async (userId: string, data: CreateLikeData) => {
    const like = await prisma.like.delete({
        where: {
            userId_classId: {
                userId,
                classId: data.classId
            }
        }
    });
    return like;
};
export const getAllLikes = async () => {
    const likes = await prisma.like.findMany({
        include: {
            user: {
                select: userSelect
            },
        }
    });
    return likes;
}
