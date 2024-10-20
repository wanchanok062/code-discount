import { Request, Response } from 'express';
import { success, fail } from '../../utility/responseHandler';
import CodeDiscountTypeService from './code-discount-type-service';

class CodeDiscountTypeController {
    async getAll(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const response = id
                ? await CodeDiscountTypeService.findById(Number(id))
                : await CodeDiscountTypeService.getAll();

            success(res, 200, 'Fetched discount types successfully', response);
        } catch (error: any) {
            console.error('Error fetching discount types:', error);
            fail(res, 500, `${error.message}`);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const newDiscountType = await CodeDiscountTypeService.create(
                req.body,
            );
            success(
                res,
                201,
                'Created discount type successfully',
                newDiscountType,
            );
        } catch (error) {
            console.error('Error creating discount type:', error);
            fail(res, 400, 'Failed to create discount type');
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const updatedDiscountType = await CodeDiscountTypeService.update(
                id,
                req.body,
            );
            success(
                res,
                200,
                'Updated discount type successfully',
                updatedDiscountType,
            );
        } catch (error) {
            console.error('Error updating discount type:', error);
            fail(res, 400, 'Failed to update discount type');
        }
    }

    async delete(req: Request, res: Response) {
        try {
            await CodeDiscountTypeService.delete(Number(req.params.id));
            success(res, 200, 'Deleted discount type successfully');
        } catch (error) {
            console.error('Error deleting discount type:', error);
            fail(res, 400, 'Failed to delete discount type');
        }
    }
}

export const codeDiscountTypeController = new CodeDiscountTypeController();
