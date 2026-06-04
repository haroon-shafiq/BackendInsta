import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
export const errorHandlder = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode;
    err.message = err.message;
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message
    })
}