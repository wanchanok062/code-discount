import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { Role } from '../../../models/role';
class AdminController {
    async getRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await Role.findAll({
                attributes: ['role_id', 'role_name'],
            });
            success(res, 200, true, 'Fetched all role successfully', roles);
        } catch (error) {
            console.error('Error fetching role :', error);
            fail(res, 400, false, 'All fields are required');
        }
    }
}

export const adminController = new AdminController();
