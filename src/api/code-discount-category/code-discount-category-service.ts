import { CodeDiscountCategory } from '../../models/code-discount-category';

class CodeDiscountCategoryService {
    async getAllCategories() {
        try {
            return await CodeDiscountCategory.findAll({
                attributes: { exclude: ['created_at', 'updated_at'] },
            });
        } catch (error: any) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }
    }
    async getCategoryById(id: number) {
        try {
            const category = await CodeDiscountCategory.findByPk(id, {
                attributes: { exclude: ['created_at', 'updated_at'] },
            });
            if (!category) {
                throw new Error('Category not found');
            }
            return category;
        } catch (error: any) {
            throw new Error(`Error fetching category by ID: ${error.message}`);
        }
    }
    async createCategory(code_discount_category_name: string) {
        try {
            if (!code_discount_category_name) {
                throw new Error('Category name is required');
            }

            const newCategory = await CodeDiscountCategory.create({
                code_discount_category_name,
            });
            return newCategory;
        } catch (error: any) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }
    async updateCategory(id: number, code_discount_category_name: string) {
        try {
            const category = await CodeDiscountCategory.findByPk(id);
            if (!category) {
                throw new Error('Category not found');
            }

            category.code_discount_category_name =
                code_discount_category_name ||
                category.code_discount_category_name;
            await category.save();
            return category;
        } catch (error: any) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }
    async deleteCategory(id: number) {
        try {
            const category = await CodeDiscountCategory.findByPk(id);
            if (!category) {
                throw new Error('Category not found');
            }

            await category.destroy();
        } catch (error: any) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}

export const codeDiscountCategoryService = new CodeDiscountCategoryService();
