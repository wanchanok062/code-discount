import { Router } from 'express';
import { adminController } from '../controller/admin/admin-controller';
import { validate } from '../../middlewares/validate';
import {
    createAdminSchema,
    loginSchema,
    updateAdminSchema,
    deleteAdminSchema,
} from '../validations/admin-validation';
import { validateToken } from '../../middlewares/authMiddleware';

const adminRouter = Router();

adminRouter.get(
    '/profile/:admin_id',
    validateToken,
    adminController.getAdminProfile,
);
adminRouter.post(
    '/',
    validateToken,
    validate(createAdminSchema),
    adminController.createAdmin,
);
adminRouter.post('/login', validate(loginSchema), adminController.login);
adminRouter.patch(
    '/profile/:admin_id',
    validateToken,
    validate(updateAdminSchema),
    adminController.updateAdmin,
);
adminRouter.delete(
    '/profile/:admin_id',
    validateToken,
    validate(deleteAdminSchema),
    adminController.deleteAdmin,
);
export default adminRouter;
