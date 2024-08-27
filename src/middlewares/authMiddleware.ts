import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config';
const secretKey = JWT_SECRET_KEY ?? '';
import { fail } from '../utility/responseHandler';

export const validateToken = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, secretKey);
        (req as any).user = decoded;
        next();
    } catch (error: any) {
        if (error.message && error.message.includes('jwt expired')) {
            return fail(res, 401, false, 'Token expired.', error);
        } else {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    }
};
