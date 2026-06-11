import { Request, Response } from "express";
import * as NotificationService from "../services/notifications.service";
import { catchAsync } from "../utils/catchAsync";
import { sendSucess } from "../utils/response";
export const getNotification = catchAsync(async (req: Request, res: Response) => {
    const notification = await NotificationService.getNotifications(req.user?.id);
    sendSucess(res, 200, "Notifications fetched successfully", notification);
})