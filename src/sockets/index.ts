import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { env } from "../config/env.config";

let io: Server;

export const initSocket = (server: HttpServer) => {
    io = new Server(server, {
        cors: {
            origin: env.FRONTEND_URL,
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User Connected:", socket.id);
        socket.on("join", (userId: string) => {
            socket.join(userId);
            console.log(`${userId} joined room`);
        });

        socket.on("disconnect", () => {
            console.log("User Disconnected:", socket.id);
        });
    });

    return io;
};

export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
};