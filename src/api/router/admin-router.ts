import { Router } from 'express';
import { adminController } from '../controller/admin/admin-controller';
import { validate } from '../../middlewares/validate';
import {
    createAdminSchema,
    loginSchema,
} from '../validations/admin-validation';
import { validateToken } from '../../middlewares/authMiddleware';

const adminRouter = Router();

adminRouter.get('/role', adminController.getRoles);
adminRouter.get('/profile', adminController.getAdminProfile);
adminRouter.post('/', validate(createAdminSchema), adminController.createAdmin);
adminRouter.post('/login', validate(loginSchema), adminController.login);

export default adminRouter;
