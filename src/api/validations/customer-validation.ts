import { z } from 'zod';
const passwordComplexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const createCustomerSchema = z.object({
    customer_name: z
        .string()
        .min(1, { message: 'Customer name cannot be empty' })
        .optional(),
    user_name: z
        .string()
        .min(1, { message: 'Username is required' })
        .max(50, { message: 'Username cannot exceed 50 characters' }),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(passwordComplexityRegex, {
            message:
                'Password must include uppercase letters, lowercase letters, numbers, and special characters',
        }),
    role_id: z
        .number()
        .int()
        .positive({ message: 'Valid role_id is required' }),
});

export const updateCustomerSchema = z.object({
    customer_name: z
        .string()
        .min(1, { message: 'Customer name cannot be empty' })
        .optional(),
});

export const deleteCustomerSchema = z.object({
    password: z
        .string()
        .min(1, { message: 'Password is required and cannot be empty' }),
});
