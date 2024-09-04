import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';

class UserController {
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const user = {
                userName: 'John Doe',
                Fname: 'John',
                Lname: 'Doe',
                email: 'anva@gmail.com',
            };
            success(res, 200, true, 'User fetched successfully', user);
        } catch (error) {
            console.error('Error fetching user:', error);
            fail(res, 400, false, 'All fields are required');
        }
    }
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { userName, Fname, Lname, email, password } = req.body;
            return success(res, 200, true, 'Create user successfully', {
                userName,
                Fname,
                Lname,
                email,
                password,
            });
        } catch (error) {
            console.error('Error creating user:', error);
            return fail(res, 400, false, 'All fields are required');
        }
    }
}

export const userController = new UserController();
