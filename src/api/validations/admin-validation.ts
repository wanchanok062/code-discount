import { z } from 'zod';

const passwordComplexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const createAdminSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    user_name: z.string().min(1, 'Username is required'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(passwordComplexityRegex, {
            message:
                'Password must include uppercase letters, lowercase letters, numbers, and special characters',
        }),
    role_id: z.number().int().positive('Role ID must be a positive integer'),
});

export const loginSchema = z.object({
    user_name: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
});
