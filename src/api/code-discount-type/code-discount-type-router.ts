import { Router } from 'express';
import { codeDiscountTypeController } from './code-discount-type-controller';
import { validate } from '../../middlewares/validate';
import { codeDiscountTypeSchema } from './code-discount-type-validation';
import { validateToken } from '../../middlewares/authMiddleware';
import { authorizeRoles } from '../../middlewares/authorizeRoles';

const router = Router();

router.get('/:id?', codeDiscountTypeController.getAll);
router.post(
    '/',
    validateToken,
    authorizeRoles('admin'),
    validate(codeDiscountTypeSchema),
    codeDiscountTypeController.create,
);
router.patch(
    '/:id',
    validateToken,
    authorizeRoles('admin'),
    validate(codeDiscountTypeSchema),
    codeDiscountTypeController.update,
);
router.delete(
    '/:id',
    validateToken,
    authorizeRoles('admin'),
    codeDiscountTypeController.delete,
);

export default router;
