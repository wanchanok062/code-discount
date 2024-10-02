import { Customer } from '../../models/customer';
import { Role } from '../../models/role';

class AuthService {
    async saveGoogleUser(profile: {
        id: string;
        displayName: string;
        emails: string | null;
    }) {
        try {
            const { id, displayName, emails } = profile;
            let customer = await Customer.findOne({
                where: { customer_id: id },
            });

            if (!customer) {
                const defaultRole = await Role.findOne({
                    where: { role_name: 'customer' },
                });
                if (!defaultRole) {
                    throw new Error('Default role not found');
                }
                if (!emails) {
                    throw new Error('No email provided in the profile');
                }
                const { role_id } = defaultRole;

                customer = await Customer.create({
                    customer_id: id,
                    user_name: emails,
                    customer_name: displayName,
                    password: null,
                    role_id: role_id,
                });
            }
            return customer;
        } catch (error: any) {
            console.error('Error saving Google user:', error);
            throw new Error(
                `An error occurred while saving the Google user data: ${error.message}`,
            );
        }
    }
}

export const authService = new AuthService();
