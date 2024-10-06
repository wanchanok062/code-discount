import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
} from 'sequelize-typescript';

@Table({
    tableName: 'code_discount_category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class CodeDiscountCategory extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    code_discount_category_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code_discount_category_name!: string;
}

export default CodeDiscountCategory;
