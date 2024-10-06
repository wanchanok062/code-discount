import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
} from 'sequelize-typescript';

@Table({
    tableName: 'code_discount_type',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
})
export class CodeDiscountType extends Model {
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
    })
    code_discount_type_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    code_discount_type!: string;
}

export default CodeDiscountType;
