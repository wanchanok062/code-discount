import { Request, Response } from 'express';

class UserController {
    async getUser(req: Request, res: Response): Promise<void> {
        try {
            const message: string = 'Hello';
            res.status(200).json({ message });
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const { Fname, Lname, email, password } = req.body;
            return res.status(201).json({ Fname, Lname, email, password });
        } catch (error) {
            console.error('Error creating user:', error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }
}

export const userController = new UserController();
