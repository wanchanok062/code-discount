import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validate =
    (schema: ZodType<any, any, any>) =>
    (req: Request, res: Response, next: NextFunction) => {
        const parseResult = schema.safeParse(req.body);

        if (!parseResult.success) {
            return res.status(400).json(parseResult.error.errors);
        }

        req.body = parseResult.data;
        next();
    };
