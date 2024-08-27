import { z } from 'zod';
export const userSchema = z.object({
    userName: z.string().min(1, 'First userName cannot be empty'),
    Fname: z.string().min(1, 'First name cannot be empty'),
    Lname: z.string().min(1, 'Last name cannot be empty'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/\d/, 'Password must contain at least one number')
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            'Password must contain at least one special character',
        ),
    email: z.string().email('Invalid email address'),
});
