import { Router } from 'express';
import { customerController } from '../controller/customer/customer-controller';
import { validate } from '../../middlewares/validate';
import { createCustomerSchema } from '../validations/customer-validation';
import { validateToken } from '../../middlewares/authMiddleware';

const customerRouter = Router();

customerRouter.get('/:customer_id', customerController.getCustomerProfile);
customerRouter.post(
    '/',
    validate(createCustomerSchema),
    customerController.createCustomer,
);

export default customerRouter;
