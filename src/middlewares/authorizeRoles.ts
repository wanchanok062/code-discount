import { Request, Response, NextFunction } from 'express';
import { fail } from '../utility/responseHandler';

export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user) {
            return fail(res, 401, 'Access denied. User not authenticated.');
        }

        const userRole = user.role;

        if (!allowedRoles.includes(userRole)) {
            return fail(res, 403, 'Access denied. Insufficient permissions.');
        }

        next();
    };
};
