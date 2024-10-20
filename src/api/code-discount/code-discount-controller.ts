import { Request, Response } from 'express';
import { codeDiscountService } from './code-discount-service';
import { success, fail } from '../../utility/responseHandler';

class CodeDiscountController {
    async createCodeDiscount(req: Request, res: Response) {
        try {
            console.log(req);
            const user_id = (req.user as any).id;
            const codeDiscount = await codeDiscountService.createCodeDiscount({
                ...req.body,
                create_by: user_id,
            });
            success(
                res,
                201,
                'Code discount created successfully',
                codeDiscount,
            );
        } catch (error: any) {
            console.error('Error creating code discount:', error);
            fail(res, 400, error.message);
        }
    }

    async getCodeDiscounts(req: Request, res: Response) {
        try {
            const codeDiscounts = await codeDiscountService.getCodeDiscounts();
            success(
                res,
                200,
                'Code discounts fetched successfully',
                codeDiscounts,
            );
        } catch (error: any) {
            console.error('Error fetching code discounts:', error);
            fail(res, 400, error.message);
        }
    }

    async updateCodeDiscount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedDiscount =
                await codeDiscountService.updateCodeDiscount(
                    Number(id),
                    req.body,
                );
            success(
                res,
                200,
                'Code discount updated successfully',
                updatedDiscount,
            );
        } catch (error: any) {
            console.error('Error updating code discount:', error);
            fail(res, 400, error.message);
        }
    }

    async deleteCodeDiscount(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await codeDiscountService.deleteCodeDiscount(Number(id));
            success(res, 200, 'Code discount deleted successfully');
        } catch (error: any) {
            console.error('Error deleting code discount:', error);
            fail(res, 400, error.message);
        }
    }
}

export const codeDiscountController = new CodeDiscountController();
