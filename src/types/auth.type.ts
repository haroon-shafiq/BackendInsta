import { JwtPayload } from "jsonwebtoken";

export interface RegisterData {
    userName: string;
    email: string;
    password: string;
    avatarUrl?: string;
}
export interface LoginData {
    email: string;
    password: string;
}
export interface UserType {
    id: String
}
export interface AuthPayload extends JwtPayload {
    id: string;
}
export interface authPayload {
    provider: "google" | "github" | "facebook" | "linkedin";
    providerId: string;
    email: string;
    userName: string;
    avatarUrl: string | null;
}
export interface User {
    id: string;
    userName: string;
    email: string;
    avatarUrl: string;
    provider: string | null;
    providerId: string | null;
}