import { Router } from 'express';
import userRoutes from './userRouter';
import authRouter from './authRouter';

const router = Router();

router.use('/api/user', userRoutes);
router.use('/api/auth', authRouter);

export default router;
