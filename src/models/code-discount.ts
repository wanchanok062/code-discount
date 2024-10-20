import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    PrimaryKey,
} from 'sequelize-typescript';
import { CodeDiscountType } from './code-discount-type';
import { CodeDiscountCategory } from './code-discount-category';

@Table({
    tableName: 'code_discount',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class CodeDiscount extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    code_discount_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code_name!: string;

    @ForeignKey(() => CodeDiscountCategory)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    code_discount_category_id!: number;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    code_discount_amount!: number;

    @ForeignKey(() => CodeDiscountType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    code_discount_type_id!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    code_discount_start_date!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    expire_date_time!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    create_by!: number;

    @BelongsTo(() => CodeDiscountCategory)
    category!: CodeDiscountCategory;

    @BelongsTo(() => CodeDiscountType)
    type!: CodeDiscountType;
}

export default CodeDiscount;
