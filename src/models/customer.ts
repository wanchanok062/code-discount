import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    CreatedAt,
    UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Role } from './role';

@Table({
    tableName: 'customers',
    timestamps: true,
})
export class Customer extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        primaryKey: true,
    })
    customer_id!: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true,
    })
    user_name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    password!: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    customer_name!: string;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    role_id!: number;

    @BelongsTo(() => Role)
    role!: Role;

    @CreatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @UpdatedAt
    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;

    @BeforeCreate
    static async setCustomerId(instance: Customer) {
        if (!instance.customer_id) {
            instance.customer_id = uuidv4();
        }
    }
}

export default Customer;
