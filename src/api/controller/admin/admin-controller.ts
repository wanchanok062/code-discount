import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { Role } from '../../../models/role';

import { adminService } from '../../controller/admin/admin-service';
class AdminController {
    async getRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await Role.findAll({
                attributes: ['role_id', 'role_name'],
            });
            success(res, 200, 'Fetched all role successfully', roles);
        } catch (error) {
            console.error('Error fetching role :', error);
            fail(res, 400, 'All fields are required');
        }
    }
    async getAdminProfile(req: Request, res: Response): Promise<void> {
        try {
            const { user_name } = req.params;
            const adminProfile = await adminService.getAdminProfile(user_name);
            success(
                res,
                200,
                'Fetched admin profile successfully',
                adminProfile,
            );
        } catch (error) {
            console.error('Error fetching role :', error);
            fail(res, 400, 'All fields are required');
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
                'Admin created successfully',
                adminResponse,
            );
        } catch (error: any) {
            console.error('Error creating admin:', error);
            return fail(res, 500, 'An error occurred while creating the admin');
        }
    }
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { user_name, password } = req.body;

            const loginResponse = await adminService.login(user_name, password);
            return success(res, 200, 'Login successful', loginResponse);
        } catch (error) {
            console.error('Error during login:', error);
            return fail(res, 401, `${error}`);
        }
    }
}

export const adminController = new AdminController();
