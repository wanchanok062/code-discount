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
    async createCustomer(data: {
        first_name: string;
        last_name: string;
        user_name: string;
        password: string;
        role_id: number;
    }) {
        try {
            const existingCustomer = await Customer.findOne({
                where: { user_name: data.user_name },
            });
            if (existingCustomer) {
                throw new Error('Username already exists');
            }

            const newCustomer = await Customer.create(data);
            return newCustomer;
        } catch (error: any) {
            throw new Error(`Error creating customer: ${error.message}`);
        }
    }
}

export const customerService = new CustomerService();
