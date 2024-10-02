import { Request, Response } from 'express';
import { success, fail } from '../../../utility/responseHandler';
import { customerService } from './customer-service';

class CustomerController {
    async getCustomerProfile(req: Request, res: Response) {
        const { customer_id: customerIdFromParams } = req.params;
        const customerIdFromJWT = (req as any).user.id;

        if (customerIdFromJWT !== customerIdFromParams) {
            return fail(res, 403, 'Unauthorized to get this profile');
        }

        try {
            const customer =
                await customerService.getCustomerById(customerIdFromParams);

            if (customer) {
                success(res, 200, 'Customer found', customer);
            } else {
                fail(res, 404, 'Customer not found');
            }
        } catch (error: any) {
            fail(res, 500, error.message);
        }
    }
    async createCustomer(req: Request, res: Response): Promise<void> {
        const { customer_name, user_name, password, role_id } = req.body;
        try {
            const newCustomer = await customerService.createCustomer({
                customer_name,
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
    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { user_name, password } = req.body;

            const loginResponse = await customerService.login(
                user_name,
                password,
            );
            return success(res, 200, 'Login successful', loginResponse);
        } catch (error) {
            console.error('Error during login:', error);
            return fail(res, 401, `${error}`);
        }
    }
    async updateCustomer(req: Request, res: Response) {
        const { customer_id: customerIdFromParams } = req.params;
        const { customer_name } = req.body;
        const customerIdFromJWT = (req as any).user.id;
        if (customerIdFromJWT !== customerIdFromParams) {
            return fail(res, 403, 'Unauthorized to update this profile');
        }

        try {
            const updatedCustomer = await customerService.updateCustomer(
                customerIdFromParams,
                { customer_name },
            );
            success(
                res,
                200,
                'Customer updated successfully',
                updatedCustomer || { message: 'Customer not found' },
            );
        } catch (error: any) {
            console.error('Error updating customer:', error);
            fail(
                res,
                500,
                `An error occurred while updating the customer: ${error.message}`,
            );
        }
    }
    async deleteCustomer(req: Request, res: Response) {
        const { customer_id: customerIdFromParams } = req.params;
        const { password } = req.body;

        const customerIdFromJWT = (req as any).user.id;

        if (customerIdFromJWT !== customerIdFromParams) {
            return fail(res, 403, 'Unauthorized to delete this profile');
        }

        try {
            const result = await customerService.deleteCustomer(
                customerIdFromParams,
                password,
            );
            success(res, 200, result.message);
        } catch (error: any) {
            console.error('Error deleting customer:', error);
            fail(
                res,
                500,
                `An error occurred while deleting the customer: ${error.message}`,
            );
        }
    }
}

export const customerController = new CustomerController();
