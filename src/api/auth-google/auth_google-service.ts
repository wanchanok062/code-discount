import { Customer } from '../../models/customer';
import { Role } from '../../models/role';

class AuthService {
    async saveGoogleUser(profile: {
        id: string;
        displayName: string;
        emails: string | null;
    }) {
        try {
            let customer = await Customer.findOne({
                where: { customer_id: profile.id },
            });

            if (!customer) {
                const defaultRole = await Role.findOne({
                    where: { role_name: 'customer' },
                });

                if (!defaultRole) {
                    throw new Error('Default role not found');
                }

                if (!profile.emails) {
                    throw new Error('No email provided in the profile');
                }

                customer = await Customer.create({
                    customer_id: profile.id,
                    user_name: profile.emails,
                    customer_name: profile.displayName,
                    password: null,
                    role_id: defaultRole.role_id,
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
