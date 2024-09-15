import { Admin } from '../../../models/admin';
import { Role } from '../../../models/role';
import { hashPassword } from '../../auth/passwordUtils';
class AdminService {
    async createAdmin(
        first_name: string,
        last_name: string,
        user_name: string,
        password: string,
        role_id: number,
    ) {
        try {
            const role = await Role.findByPk(role_id);
            if (!role) {
                throw new Error('Role not found');
            }

            const hashedPassword = await hashPassword(password);
            const newAdmin = await Admin.create({
                first_name,
                last_name,
                user_name,
                password: hashedPassword,
                role_id,
            });
            return {
                id: newAdmin.admin_id,
                user_name: newAdmin.user_name,
                role: role.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }
}
export const adminService = new AdminService();
