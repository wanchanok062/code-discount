import { Request, Response, NextFunction } from 'express';
import { success, fail } from '../../utility/responseHandler';

class GoogleOAuth {
    async googleCallback(req: Request, res: Response): Promise<void> {
        try {
            const userProfile = req.user;
            res.json(userProfile);
        } catch (error) {
            console.error('Error fetching user:', error);
            fail(res, 400, 'All fields are required');
        }
    }
    async logout(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            req.logout((err) => {
                if (err) {
                    return res
                        .status(500)
                        .json({ message: 'Logout failed', error: err });
                }
                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'Session destruction failed',
                            error: err,
                        });
                    }
                    res.clearCookie('connect.sid');
                    success(res, 200, 'Logged out successfully');
                });
            });
        } catch (error) {
            console.error('Error fetching role :', error);
            fail(res, 400, 'All fields are required');
        }
    }
}

export const googleOAuth = new GoogleOAuth();
