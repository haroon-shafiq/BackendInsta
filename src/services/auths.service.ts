import { prisma } from "../config/db.config";
import { authPayload, LoginData, RegisterData } from "../types/auth.type"
import { AppError } from "../utils/appError";
import { generateAccessToken } from "../utils/token";
import { checkExistUser, createUser, updateUserProvider } from "./users.service"
import bcrypt from 'bcrypt';

export const register = async (data: RegisterData) => {
    const existUser = await checkExistUser(data.email);
    if (existUser) {
        throw new AppError(400, "This user already exists.");
    }
    const user = await createUser(data);
    return user;
}
export const login = async (data: LoginData) => {
    const existUser = await checkExistUser(data.email);
    if (!existUser) throw new AppError(401, "Invalid email or password");
    if (!existUser.password) throw new AppError(400, "This account uses google Sign in. Please Sign in with google")
    const passwordMatched = await bcrypt.compare(data.password, existUser.password);
    if (!passwordMatched) throw new AppError(401, "Invalid email or password");
    const accessToken = generateAccessToken(existUser);
    return { user: existUser, accessToken };
}

export const authLogin = async (profile: authPayload) => {
    let existUser = await checkExistUser(profile.email);
    if (existUser) {
        if (existUser.provider === 'credentials') {
            existUser = await updateUserProvider(profile, existUser);
        }
        else if (existUser.provider !== profile.provider) {
            existUser = await updateUserProvider(profile, existUser);
        }
    }
    else {
        existUser = await prisma.user.create({
            data: {
                userName: profile.userName,
                email: profile.email,
                avatarUrl: profile.avatarUrl || "",
                provider: profile.provider,
                providerId: profile.providerId,
            }
        })
    }
    const accessToken = generateAccessToken(existUser);
    return { user: existUser, accessToken };
}