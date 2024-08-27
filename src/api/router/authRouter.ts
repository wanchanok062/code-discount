// routes/userRoutes.ts
import { Router } from 'express';
import { authController } from '../controller/auth/authController';

const router = Router();

router.post('/login', authController.login);

export default router;
