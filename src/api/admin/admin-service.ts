import { Admin } from '../../models/admin';
import { Role } from '../../models/role';
import { hashPassword, comparePasswords } from '../auth/passwordUtils';
import { generateToken } from '../auth/generateToken';
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
                admin_id: admin.admin_id,
                role: admin.role?.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }
    async getAdminProfile(admin_id: string | number) {
        try {
            const adminProfile = await Admin.findOne({
                where: { admin_id },
                include: [
                    {
                        model: Role,
                        attributes: ['role_name'],
                    },
                ],
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'role_id'],
                },
            });
            if (!adminProfile) {
                throw new Error('Admin not found');
            }
            return adminProfile;
        } catch (error) {
            throw new Error(`Error fetching admin profile: ${error}`);
        }
    }
    async updateAdmin(
        admin_id: string | number,
        first_name: string,
        last_name: string,
    ) {
        try {
            const admin = await Admin.findByPk(admin_id);

            if (!admin) {
                throw new Error('Admin not found');
            }

            admin.first_name = first_name;
            admin.last_name = last_name;
            await admin.save();

            return {
                id: admin.admin_id,
                user_name: admin.user_name,
                first_name: admin.first_name,
                last_name: admin.last_name,
            };
        } catch (error: any) {
            throw new Error(`Error updating admin: ${error.message}`);
        }
    }
    async deleteAdmin(admin_id: string | number, password: string) {
        try {
            const admin = await Admin.findByPk(admin_id);

            if (!admin) {
                throw new Error('Admin not found');
            }

            const isPasswordValid = await comparePasswords(
                password,
                admin.password,
            );

            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            await admin.destroy();
        } catch (error: any) {
            throw new Error(`Error deleting admin: ${error.message}`);
        }
    }
}
export const adminService = new AdminService();
