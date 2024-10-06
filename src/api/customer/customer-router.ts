import { Router } from 'express';
import { customerController } from '../customer/customer-controller';
import { validate } from '../../middlewares/validate';
import {
    createCustomerSchema,
    updateCustomerSchema,
    deleteCustomerSchema,
} from '../customer/customer-validation';
import { validateToken } from '../../middlewares/authMiddleware';

const customerRouter = Router();

customerRouter.get(
    '/:customer_id',
    validateToken,
    customerController.getCustomerProfile,
);
customerRouter.post(
    '/',
    validate(createCustomerSchema),
    customerController.createCustomer,
);
customerRouter.post('/login', customerController.login);
customerRouter.patch(
    '/:customer_id',
    validateToken,
    validate(updateCustomerSchema),
    customerController.updateCustomer,
);
customerRouter.delete(
    '/profile/:customer_id',
    validateToken,
    validate(deleteCustomerSchema),
    customerController.deleteCustomer,
);

export default customerRouter;
