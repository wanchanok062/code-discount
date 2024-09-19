import { Customer } from '../../../models/customer';
import { Role } from '../../../models/role';
import { generateToken } from '../../auth/generateToken';
import { hashPassword, comparePasswords } from '../../auth/passwordUtils';
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
            const role = await Role.findByPk(data.role_id);
            if (!role) {
                throw new Error('Role not found');
            }
            const { password } = data;
            const hashedPassword = await hashPassword(password);
            const newCustomer = await Customer.create({
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
                user_name: customer.user_name,
                role: customer.role?.role_name,
            };
        } catch (error: any) {
            throw new Error(`Error creating admin: ${error.message}`);
        }
    }
    async updateCustomer(
        customer_id: string,
        data: {
            first_name?: string;
            last_name?: string;
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
}

export const customerService = new CustomerService();
