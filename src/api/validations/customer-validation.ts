import { z } from 'zod';
const passwordComplexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

export const createCustomerSchema = z.object({
    first_name: z
        .string()
        .min(1, { message: 'First name is required' })
        .max(50, { message: 'First name cannot exceed 50 characters' }),
    last_name: z
        .string()
        .min(1, { message: 'Last name is required' })
        .max(50, { message: 'Last name cannot exceed 50 characters' }),
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
