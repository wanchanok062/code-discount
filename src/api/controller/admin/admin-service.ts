import { Admin } from '../../../models/admin';
import { Role } from '../../../models/role';
import { hashPassword, comparePasswords } from '../../auth/passwordUtils';
import { generateToken } from '../../auth/generateToken';
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
    async login(user_name: string, password: string) {
        try {
            const admin = await Admin.findOne({
                where: { user_name },
                include: [{ model: Role, attributes: ['role_name'] }],
            });
            if (!admin) {
                throw new Error('Invalid username or password');
            }
            const isPasswordValid = await comparePasswords(
                password,
                admin.password,
            );
            if (!isPasswordValid) {
                throw new Error('Invalid username or password');
            }
            const token = generateToken(admin.admin_id, admin.user_name);
            return {
                token,
                user_name: admin.user_name,
                role: admin.role?.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }
}
export const adminService = new AdminService();
