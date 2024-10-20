import { z } from 'zod';

export const codeDiscountTypeSchema = z.object({
    code_discount_type: z
        .string()
        .min(1, { message: 'Discount type name is required' }),
});
