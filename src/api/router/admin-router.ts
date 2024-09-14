import { Router } from 'express';
import { adminController } from '../controller/admin/admin-controller';
import { validate } from '../../middlewares/validate';
import { userSchema } from '../validations/userValidation';
import { validateToken } from '../../middlewares/authMiddleware';

const adminRouter = Router();

adminRouter.get('/role', adminController.getRoles);
// router.post('/', validate(userSchema), userController.createUser);

export default adminRouter;
