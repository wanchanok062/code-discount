import { Router } from 'express';
import { adminController } from '../controller/admin/adminController';
import { validate } from '../../middlewares/validate';
import { userSchema } from '../validations/userValidation';
import { validateToken } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/role', adminController.getRoles);
// router.post('/', validate(userSchema), userController.createUser);

export default router;
