import { Router } from 'express';
import { codeDiscountController } from './code-discount-controller';
import { validate } from '../../middlewares/validate';
import {
    codeDiscountSchema,
    codeDiscountUpdateSchema,
} from './code-discount-validation';
import { validateToken } from '../../middlewares/authMiddleware';

const router = Router();

router.get('/', validateToken, codeDiscountController.getCodeDiscounts);
router.post(
    '/',
    validateToken,
    validate(codeDiscountSchema),
    codeDiscountController.createCodeDiscount,
);

router.patch(
    '/:id',
    // validateToken,
    validate(codeDiscountUpdateSchema),
    codeDiscountController.updateCodeDiscount,
);
router.delete(
    '/:id',
    // validateToken,
    codeDiscountController.deleteCodeDiscount,
);

export default router;
