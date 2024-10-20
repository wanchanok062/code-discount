import { CodeDiscount } from '../../models/code-discount';
import { CodeDiscountCategory } from '../../models/code-discount-category';
import { CodeDiscountType } from '../../models/code-discount-type';

class CodeDiscountService {
    async createCodeDiscount(data: any) {
        try {
            const newDiscount = await CodeDiscount.create(data);
            return newDiscount;
        } catch (error: any) {
            throw new Error(`Error creating code discount: ${error.message}`);
        }
    }

    async getCodeDiscounts() {
        try {
            const discounts = await CodeDiscount.findAll({
                attributes: { exclude: ['created_at', 'updated_at'] },
                include: [
                    {
                        model: CodeDiscountCategory,
                        as: 'category',
                        attributes: ['code_discount_category_name'],
                    },
                    {
                        model: CodeDiscountType,
                        as: 'type',
                        attributes: ['code_discount_type'],
                    },
                ],
            });
            return discounts;
        } catch (error: any) {
            throw new Error(`Error fetching code discounts: ${error.message}`);
        }
    }

    async updateCodeDiscount(id: number, data: any) {
        try {
            const discount = await CodeDiscount.findByPk(id);
            if (!discount) {
                throw new Error(`Code discount with id ${id} not found`);
            }
            const updatedDiscount = await discount.update(data);
            return updatedDiscount;
        } catch (error: any) {
            throw new Error(`Error updating code discount: ${error.message}`);
        }
    }

    async deleteCodeDiscount(id: number) {
        try {
            const discount = await CodeDiscount.findByPk(id);
            if (!discount) {
                throw new Error(`Code discount with id ${id} not found`);
            }
            await discount.destroy();
        } catch (error: any) {
            throw new Error(`Error deleting code discount: ${error.message}`);
        }
    }
}

export const codeDiscountService = new CodeDiscountService();
