import CodeDiscountType from '../../models/code-discount-type';

class CodeDiscountTypeService {
    async getAll() {
        try {
            return await CodeDiscountType.findAll({
                attributes: { exclude: ['created_at', 'updated_at'] },
            });
        } catch (error: any) {
            throw new Error(`Failed to fetch discount types: ${error.message}`);
        }
    }

    async findById(id: number) {
        try {
            const discountType = await CodeDiscountType.findByPk(id, {
                attributes: { exclude: ['created_at', 'updated_at'] },
            });

            if (!discountType) {
                throw new Error('Discount type not found');
            }
            return discountType;
        } catch (error: any) {
            throw new Error(
                `Failed to fetch discount type with ID ${id}: ${error.message}`,
            );
        }
    }

    async create(data: { code_discount_type: string }) {
        try {
            return await CodeDiscountType.create(data);
        } catch (error: any) {
            throw new Error(`Failed to create discount type: ${error.message}`);
        }
    }

    async update(id: number, data: { code_discount_type: string }) {
        try {
            const discountType = await CodeDiscountType.findByPk(id);
            if (!discountType) throw new Error('Discount type not found');

            return await discountType.update(data);
        } catch (error: any) {
            throw new Error(
                `Failed to update discount type with ID ${id}: ${error.message}`,
            );
        }
    }

    async delete(id: number) {
        try {
            const discountType = await CodeDiscountType.findByPk(id);
            if (!discountType) throw new Error('Discount type not found');

            return await discountType.destroy();
        } catch (error: any) {
            throw new Error(
                `Failed to delete discount type with ID ${id}: ${error.message}`,
            );
        }
    }
}

export default new CodeDiscountTypeService();
