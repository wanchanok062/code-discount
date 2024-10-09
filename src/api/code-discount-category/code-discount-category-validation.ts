import { z } from 'zod';

export const codeDiscountCategorySchema = z.object({
    code_discount_category_name: z
        .string()
        .min(1, { message: 'Category name is required' }),
});
