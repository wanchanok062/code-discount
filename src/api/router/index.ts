import { Router } from 'express';
import adminRouter from '../admin/admin-router';
import customerRouter from '../customer/customer-router';
import authRouter from '../auth-google/auth-google-router';
import CodeDiscountCategoryRouter from '../code-discount-category/code-discount-category-router';

const router = Router();

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/customer', customerRouter);
router.use('/auth', authRouter);
router.use('/api/v1/code-discount-category', CodeDiscountCategoryRouter);

export default router;
