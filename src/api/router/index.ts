import { Router } from 'express';
import adminRouter from './admin-router';
import customerRouter from './customer-router';
import authRouter from '../router/auth-google-router';

const router = Router();

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/customer', customerRouter);
router.use('/auth', authRouter);

export default router;
