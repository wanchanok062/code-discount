import { Response } from 'express';

type ResponseData = Record<string, any>;

const sendResponse = (
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

export const success = (
    res: Response,
    statusCode: number,
    message: string,
    data: ResponseData = {},
): Response => {
    return sendResponse(res, statusCode, true, message, data);
};

export const fail = (
    res: Response,
    statusCode: number,
    message: string,
    errorDetails?: any,
): Response => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errorDetails && { error: errorDetails }),
    });
};
