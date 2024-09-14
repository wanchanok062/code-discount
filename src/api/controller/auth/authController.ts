import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { generateToken } from './utils/auth';

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { userName, email } = req.body;
            const token = generateToken(userName, email);
            success(res, 200, true, 'User fetched successfully', { token });
        } catch (error) {
            console.error('Error fetching user:', error);
            fail(res, 400, false, 'All fields are required');
        }
    }
}

export const authController = new AuthController();
