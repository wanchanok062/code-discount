import { Router } from 'express';
import userRoutes from './userRouter/userRouter';

const router = Router();

router.use('/api', userRoutes);

export default router;
