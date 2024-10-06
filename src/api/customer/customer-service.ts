import { Customer } from '../../models/customer';
import { Role } from '../../models/role';
import { generateToken } from '../auth/generateToken';
import { hashPassword, comparePasswords } from '../auth/passwordUtils';
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
        customer_name: string;
        user_name: string;
        password: string;
        role_id: number;
    }) {
        try {
            if (!data.user_name || !data.customer_name || !data.role_id) {
                throw new Error(
                    'Missing required fields: user_name, customer_name, or role_id',
                );
            }

            const existingCustomer = await Customer.findOne({
                where: { user_name: data.user_name },
            });
            if (existingCustomer) {
                throw new Error('Username already exists');
            }

            const role = await Role.findByPk(data.role_id);
            if (!role) {
                throw new Error('Role not found');
            }

            const hashedPassword = await hashPassword(data.password);

            const newCustomer = await Customer.create({
                customer_id: '',
                ...data,
                password: hashedPassword,
            });

            return {
                customer_id: newCustomer.customer_id,
                role: role.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating customer: ${error.message}`);
        }
    }
    async login(user_name: string, password: string) {
        try {
            const customer = await Customer.findOne({
                where: { user_name },
                attributes: ['customer_id', 'user_name', 'password'],
                include: [{ model: Role, attributes: ['role_name'] }],
            });
            if (!customer) {
                throw new Error('Invalid username or password');
            }
            const isPasswordValid = await comparePasswords(
                password,
                customer.password,
            );
            if (!isPasswordValid) {
                throw new Error('Invalid username or password');
            }
            const token = generateToken(
                customer.customer_id,
                customer.user_name,
            );
            return {
                token,
                customer_id: customer.customer_id,
                role: customer.role?.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }
    async updateCustomer(
        customer_id: string,
        data: {
            customer_name?: string;
        },
    ) {
        try {
            const customer = await Customer.findByPk(customer_id);
            if (!customer) {
                throw new Error('Customer not found');
            }
            await customer.update(data);
            const updatedCustomer = await Customer.findByPk(customer_id, {
                attributes: {
                    exclude: [
                        'password',
                        'createdAt',
                        'updatedAt',
                        'role_id',
                        'customer_id',
                    ],
                },
                include: [{ model: Role, attributes: ['role_name'] }],
            });
            return updatedCustomer;
        } catch (error: any) {
            throw new Error(`Error updating customer: ${error.message}`);
        }
    }
    async deleteCustomer(customer_id: string, password: string) {
        try {
            const customer = await Customer.findByPk(customer_id, {
                attributes: ['customer_id', 'password'],
            });

            if (!customer) {
                throw new Error('Customer not found');
            }
            const isPasswordValid = await comparePasswords(
                password,
                customer.password,
            );
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            await customer.destroy();
            return { message: 'Customer deleted successfully' };
        } catch (error: any) {
            throw new Error(`Error deleting customer: ${error.message}`);
        }
    }
}

export const customerService = new CustomerService();
