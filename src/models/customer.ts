import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Role } from './role';

@Table({
    timestamps: true,
    tableName: 'customers',
})
export class Customer extends Model {
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
        primaryKey: true,
    })
    customer_id!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    first_name!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    last_name!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    user_name!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    password!: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    role_id!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
        allowNull: false,
    })
    updatedAt!: Date;
}

export default Customer;
