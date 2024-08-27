// routes/userRoutes.ts
import { Router } from 'express';
import { userController } from '../controller/userController/userController';
import { validate } from '../../middlewares/validate';
import { userSchema } from '../validations/userValidation';
import { validateToken } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', validateToken, userController.getUser);
router.post('/', validate(userSchema), userController.createUser);

export default router;
