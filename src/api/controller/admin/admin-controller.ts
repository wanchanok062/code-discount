import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { Role } from '../../../models/role';
import { Admin } from '../../../models/admin';
import { adminService } from '../../controller/admin/admin-service';
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
    async getAdminProfile(req: Request, res: Response): Promise<void> {
        try {
            const adminProfile = await Admin.findAll();
            success(
                res,
                200,
                true,
                'Fetched all admin profile successfully',
                adminProfile,
            );
        } catch (error) {
            console.error('Error fetching role :', error);
            fail(res, 400, false, 'All fields are required');
        }
    }
    async createAdmin(req: Request, res: Response): Promise<Response> {
        try {
            const { first_name, last_name, user_name, password, role_id } =
                req.body;
            const adminResponse = await adminService.createAdmin(
                first_name,
                last_name,
                user_name,
                password,
                role_id,
            );
            return success(
                res,
                201,
                true,
                'Admin created successfully',
                adminResponse,
            );
        } catch (error) {
            console.error('Error creating admin:', error);
            return fail(
                res,
                500,
                false,
                'An error occurred while creating the admin',
            );
        }
    }
}

export const adminController = new AdminController();
