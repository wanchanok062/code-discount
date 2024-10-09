import { Router } from 'express';
import { codeDiscountCategoryController } from './code-discount-category-controller';
import { validate } from '../../middlewares/validate';
import { validateToken } from '../../middlewares/authMiddleware';
import { authorizeRoles } from '../../middlewares/authorizeRoles';
import { codeDiscountCategorySchema } from './code-discount-category-validation';

const router = Router();

router.get('/', codeDiscountCategoryController.getAll);

router.get('/:id', codeDiscountCategoryController.getById);

router.post(
    '/',
    validateToken,
    authorizeRoles('admin'),
    validate(codeDiscountCategorySchema),
    codeDiscountCategoryController.create,
);

router.patch(
    '/:id',
    validateToken,
    authorizeRoles('admin'),
    validate(codeDiscountCategorySchema),
    codeDiscountCategoryController.update,
);

router.delete(
    '/:id',
    validateToken,
    authorizeRoles('admin'),
    codeDiscountCategoryController.delete,
);

export default router;
