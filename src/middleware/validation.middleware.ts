import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/appError";

export const validate = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errorMessage = result.array()
            .map(err => err.msg)
            .join(', ');
        return next(new AppError(400, errorMessage));
    }

    next();
};


export const normalizeBody = (req: Request, res: Response, next: NextFunction) => {
    req.body = Object.assign({}, req.body);
    next();
};