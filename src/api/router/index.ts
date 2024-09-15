import { Router } from 'express';
import userRoutes from './userRouter';
import adminRouter from './admin-router';

const router = Router();

router.use('/api/v1/user', userRoutes);
router.use('/api/v1/admin', adminRouter);

export default router;
