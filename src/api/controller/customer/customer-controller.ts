import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { customerService } from './customer-service';

class CustomerController {
    async getCustomerProfile(req: Request, res: Response): Promise<void> {
        const { customer_id } = req.params;
        try {
            const customer = await customerService.getCustomerById(customer_id);

            if (customer) {
                success(res, 200, 'Customer found', customer);
            } else {
                fail(res, 404, 'Customer not found');
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
            fail(res, 500, 'An error occurred while fetching the customer');
        }
    }
    async createCustomer(req: Request, res: Response): Promise<void> {
        const { first_name, last_name, user_name, password, role_id } =
            req.body;
        try {
            const newCustomer = await customerService.createCustomer({
                first_name,
                last_name,
                user_name,
                password,
                role_id,
            });

            success(res, 201, 'Customer created successfully', newCustomer);
        } catch (error: any) {
            console.error('Error creating customer:', error);
            fail(
                res,
                500,
                `An error occurred while creating the customer: ${error.message}`,
            );
        }
    }
}

export const customerController = new CustomerController();
