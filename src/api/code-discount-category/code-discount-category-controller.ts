import { Request, Response } from 'express';
import { codeDiscountCategoryService } from './code-discount-category-service';
import { success, fail } from '../../utility/responseHandler';

class CodeDiscountCategoryController {
    async getAll(req: Request, res: Response) {
        try {
            const categories =
                await codeDiscountCategoryService.getAllCategories();
            success(res, 200, 'Categories fetched successfully', categories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            fail(res, 500, 'Error fetching categories');
        }
    }
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await codeDiscountCategoryService.getCategoryById(
                parseInt(id),
            );

            success(res, 200, 'Category fetched successfully', category);
        } catch (error: any) {
            console.error('Error fetching category by ID:', error);
            fail(res, 500, error.message);
        }
    }
    async create(req: Request, res: Response) {
        try {
            const { code_discount_category_name } = req.body;
            const newCategory =
                await codeDiscountCategoryService.createCategory(
                    code_discount_category_name,
                );
            success(res, 201, 'Category created successfully', newCategory);
        } catch (error: any) {
            console.error('Error creating category:', error);
            fail(res, 500, error.message);
        }
    }
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { code_discount_category_name } = req.body;

            const updatedCategory =
                await codeDiscountCategoryService.updateCategory(
                    parseInt(id),
                    code_discount_category_name,
                );
            success(res, 200, 'Category updated successfully', updatedCategory);
        } catch (error: any) {
            console.error('Error updating category:', error);
            fail(res, 500, error.message);
        }
    }
    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await codeDiscountCategoryService.deleteCategory(parseInt(id));
            success(res, 200, 'Category deleted successfully');
        } catch (error: any) {
            console.error('Error deleting category:', error);
            fail(res, 500, error.message);
        }
    }
}

export const codeDiscountCategoryController =
    new CodeDiscountCategoryController();
