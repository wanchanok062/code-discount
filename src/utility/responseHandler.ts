import { Response } from 'express';

type ResponseData = Record<string, any>;

export const success = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data: ResponseData = {},
): Response => {
    return res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export const fail = (
    res: Response,
    statusCode: number,
    success: boolean,
    message: string,
    data: ResponseData = {},
    error: string | null = null,
): Response => {
    return res.status(statusCode).json({
        success,
        message,
        data,
        error,
    });
};
