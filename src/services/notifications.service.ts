import { prisma } from "../config/db.config";
import { userSelect } from "../constants/selectors";
import { getIO } from "../sockets";

interface NotificationType {
    recipientId: string;
    authorId: string;
    action: string;
    entityId: string;
    entityType: string;
}
export const createNotification = async ({
    recipientId,
    authorId,
    action,
    entityId,
    entityType,
}: NotificationType) => {
    const notification = await prisma.notification.create({
        data: {
            recipientId,
            authorId,
            action,
            entityId,
            entityType,
        },
        include: {
            author: {
                select: userSelect,
            },
        },
    });
    const io = getIO();
    io.to(recipientId).emit("notification", notification);
    return notification;
};

export const createManyNotifications = async (
    notifications: NotificationType[]
) => {
    if (!notifications.length) return;
    await prisma.notification.createMany({
        data: notifications,
    });
    const firstNotification = notifications[0];
    console.log("Sample", firstNotification)
    const createdNotifications = await prisma.notification.findMany({
        where: {
            entityId: firstNotification?.entityId,
            action: firstNotification?.action,
        },
        include: {
            author: {
                select: userSelect,
            },
        },
    });

    const io = getIO();
    console.log("Create Notification", createNotification)
    createdNotifications.forEach((notification) => {
        io.to(notification.recipientId).emit("notification", notification);
    });

    return createdNotifications;
};


export const getNotifications = async (userId: string) => {
    return prisma.notification.findMany({
        where: {
            recipientId: userId,
        },
        include: {
            recipient: {
                select: userSelect,
            },
            author: {
                select: userSelect,
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 50,
    });
};