import { NextFunction, Request, Response } from 'express';
import multer from "multer";
import { catchAsync } from '../utils/catchAsync';
import cloudinary from '../config/cloudinary.config';
import { AppError } from '../utils/appError';
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, file.originalname);
    }
})
export const upload = multer({ storage })

export const uploadToCloudinary = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const filePath = req?.file?.path;
    if (filePath) {
        const result = await cloudinary.uploader.upload(filePath);
        if (!result) {
            throw new AppError(400, "Image not uploaded")
        }
        req.body.imageUrl = result.url;
    }
    next();
})
