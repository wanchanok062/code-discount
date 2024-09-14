import { Router } from 'express';
import userRoutes from './userRouter';
import authRouter from './authRouter';
import adminRouter from './adminRouter';

const router = Router();

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/admin', adminRouter);

export default router;
