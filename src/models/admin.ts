import {
    Table,
    Column,
    Model,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Role } from './role';

@Table({
    tableName: 'admin',
    timestamps: true,
})
export class Admin extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    admin_id!: number;

    @Column
    first_name!: string;

    @Column
    last_name!: string;

    @Column
    user_name!: string;

    @Column
    password!: string;

    @ForeignKey(() => Role)
    @Column
    role_id!: number;

    @BelongsTo(() => Role)
    role!: Role;

    public static associate(models: any) {
        Admin.belongsTo(models.Role, {
            foreignKey: 'role_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    }
}

export default Admin;
