// routes/userRoutes.ts
import { Router } from 'express';
import { userController } from '../../controller/userController/userController';
import { userValidation } from '../../validation/userValidation';
import handleValidationErrors from '../../../middlewares/handleValidationErrors';

const router = Router();

router.get('/user', userController.getUser);
router.post(
    '/user',
    userValidation.createUserValidation,
    handleValidationErrors,
    userController.createUser,
);

export default router;
