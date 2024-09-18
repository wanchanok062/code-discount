import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { customerService } from './customer-service';

class CustomerController {
    async getCustomerById(req: Request, res: Response): Promise<void> {
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
}

export const customerController = new CustomerController();
