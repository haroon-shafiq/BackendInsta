import cloudinary from '../config/cloudinary.config';
import { AppError } from '../utils/appError';
import fs from 'fs';
export const uploadToCloudinary = async (filePath: string): Promise<string> => {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        if (!result || !result.secure_url) {
            throw new AppError(400, "Image upload to Cloudinary failed");
        }
        return result.secure_url;

    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        throw error;
    }
};
