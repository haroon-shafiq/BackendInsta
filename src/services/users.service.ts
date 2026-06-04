import bcrypt from 'bcrypt';
import { prisma } from "../config/db.config";
import { GoogleUserPayload, RegisterData } from "../types/auth.type";
import { AppError } from "../utils/appError";
import { User } from '../../generated/prisma/client';

export const checkExistUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    return user;
}
export const createUser = async (data: RegisterData) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: {
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            avatarUrl: data.avatarUrl || ""
        }
    })
    return user
}

export const updateUserProvider = async (profile: GoogleUserPayload, existUser: User) => {
    const user = await prisma.user.update({
        where: {
            id: existUser.id
        },
        data: {
            userName: profile.userName || existUser.userName,
            provider: profile.provider,
            providerId: profile.providerId,
            avatarUrl: profile?.avatarUrl || existUser?.avatarUrl || ""
        }
    })
    return user;
}