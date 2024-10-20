import { Router } from 'express';
import adminRouter from '../admin/admin-router';
import customerRouter from '../customer/customer-router';
import authRouter from '../auth-google/auth-google-router';
import codeDiscountCategoryRouter from '../code-discount-category/code-discount-category-router';
import codeDiscountTypeRouter from '../code-discount-type/code-discount-type-router';
import codeDiscount from '../code-discount/code-discount-router';

const router = Router();

router.use('/api/v1/admin', adminRouter);
router.use('/api/v1/customer', customerRouter);
router.use('/auth', authRouter);
router.use('/api/v1/code-discount-category', codeDiscountCategoryRouter);
router.use('/api/v1/code-discount-type', codeDiscountTypeRouter);
router.use('/api/v1/code-discount', codeDiscount);

export default router;
