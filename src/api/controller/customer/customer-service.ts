import { Customer } from '../../../models/customer';
import { Role } from '../../../models/role';

class CustomerService {
    async getCustomerById(id: string) {
        try {
            const customer = await Customer.findByPk(id, {
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt', 'role_id'],
                },
                include: [{ model: Role, attributes: ['role_name'] }],
            });
            if (!customer) {
                throw new Error('Customer not found');
            }
            return customer;
        } catch (error: any) {
            throw new Error(`Error fetching customer: ${error.message}`);
        }
    }
}

export const customerService = new CustomerService();
