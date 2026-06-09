import { prisma } from "../config/db.config"
import { userSelect } from "../constants/selectors";
import { AppError } from "../utils/appError";


const checkExistFollow = async (followerId: string, followingId: string) => {
    const existingFollow = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: followerId,
                followingId: followingId
            }
        }
    });
    if (existingFollow) {
        return true
    }
    return false
}
export const followUser = async (followerId: string, followingId: string) => {
    if (followerId === followingId) {
        throw new AppError(400, "You cannot follow yourself");
    }
    const isFollowing = await checkExistFollow(followerId, followingId);
    if (isFollowing) {
        throw new AppError(400, "You already followed this user");
    }
    const userFollow = await prisma.follow.create({
        data: {
            followerId: followerId,
            followingId: followingId
        }
    })
    return userFollow;
}
export const getFollowers = async (userId: string) => {
    const userFollowers = await prisma.follow.findMany({
        where: {
            followingId: userId
        },
        include: {
            follower: {
                select: userSelect
            }
        }

    })
    return userFollowers.map(f => f.follower);
}
export const getFollowings = async (userId: string) => {
    const userFollowings = await prisma.follow.findMany({
        where: {
            followerId: userId
        },
        include: {
            following: {
                select: userSelect
            }
        }
    })
    return userFollowings.map(f => f.following);
}
export const unfollow = async (userId: string, followingId: string) => {
    console.log("id===>>>>>>>>>", followingId)
    const unFollowUser = await prisma.follow.delete({
        where: {
            followerId_followingId: {
                followerId: userId,
                followingId: followingId
            }
        }
    })
    return unFollowUser;
}
