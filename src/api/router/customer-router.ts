import { Router } from 'express';
import { customerController } from '../controller/customer/customer-controller';
import { validate } from '../../middlewares/validate';
// import { userSchema } from '../validations/userValidation';
import { validateToken } from '../../middlewares/authMiddleware';

const customerRouter = Router();

customerRouter.get('/:customer_id', customerController.getCustomerById);

export default customerRouter;
