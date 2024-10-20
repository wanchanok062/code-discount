import { z } from 'zod';

export const codeDiscountSchema = z.object({
    code_name: z.string().min(1, { message: 'Code name is required' }),
    code_discount_category_id: z.number().int().positive(),
    code_discount_amount: z.number().positive(),
    code_discount_type_id: z.number().int().positive(),
    code_discount_start_date: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date)
            return new Date(arg);
    }, z.date()),
    expire_date_time: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date)
            return new Date(arg);
    }, z.date()),
});

export const codeDiscountUpdateSchema = codeDiscountSchema.partial();
