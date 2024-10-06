import { Request, Response } from 'express';
import { success, fail } from '../../utility/responseHandler';

import { adminService } from '../admin/admin-service';
class AdminController {
    async getAdminProfile(req: Request, res: Response) {
        try {
            const { admin_id } = req.params;
            const adminProfile = await adminService.getAdminProfile(admin_id);
            success(
                res,
                200,
                'Fetched admin profile successfully',
                adminProfile,
            );
        } catch (error: any) {
            console.error('Error fetching :', error.message);
            return fail(res, 500, 'Admin not found', error.message);
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
            console.error(error);
            return fail(res, 500, `${error}`);
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
    async updateAdmin(req: Request, res: Response): Promise<Response> {
        try {
            const { admin_id } = req.params;
            const { first_name, last_name } = req.body;

            if (admin_id !== (req as any).user.id.toString()) {
                return fail(res, 403, 'Unauthorized to edit this profile');
            }

            const updatedAdmin = await adminService.updateAdmin(
                admin_id,
                first_name,
                last_name,
            );

            return success(
                res,
                200,
                'Admin profile updated successfully',
                updatedAdmin,
            );
        } catch (error: any) {
            console.error('Error updating admin:', error);
            return fail(res, 500, `Error updating admin: ${error.message}`);
        }
    }
    async deleteAdmin(req: Request, res: Response): Promise<Response> {
        try {
            const { admin_id } = req.params;
            const { password } = req.body;

            if (admin_id !== (req as any).user.id.toString()) {
                return fail(res, 403, 'Unauthorized to edit this profile');
            }

            await adminService.deleteAdmin(admin_id, password);

            return success(res, 200, 'Admin deleted successfully');
        } catch (error: any) {
            console.error('Error deleting admin:', error);
            return fail(res, 500, `Error deleting admin: ${error.message}`);
        }
    }
}

export const adminController = new AdminController();
