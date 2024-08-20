// routes/userRoutes.ts
import { Router } from 'express';
import { userController } from '../../controller/userController/userController';

const router = Router();

router.get('/user', userController.getUser);
router.post('/user', userController.createUser);

export default router;
