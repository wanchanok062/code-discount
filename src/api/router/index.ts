import { Router } from 'express';
import adminRouter from '../admin/admin-router';
import customerRouter from '../customer/customer-router';
import authRouter from '../auth-google/auth-google-router';

const router = Router();

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/customer', customerRouter);
router.use('/auth', authRouter);

export default router;
