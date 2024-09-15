import {
    Table,
    Column,
    Model,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    BeforeCreate,
    DataType,
} from 'sequelize-typescript';
import { Role } from './role';

@Table({
    tableName: 'admin',
    timestamps: true,
})
export class Admin extends Model {
    @PrimaryKey
    @Column(DataType.BIGINT)
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

    @BeforeCreate
    static async generateAdminId(instance: Admin) {
        const prefix = 65;
        const lastAdmin = await Admin.findOne({
            order: [['admin_id', 'DESC']],
            attributes: ['admin_id'],
        });

        if (lastAdmin) {
            const lastIdNumber = lastAdmin.admin_id - prefix * 1000;
            const newIdNumber = lastIdNumber + 1;
            instance.admin_id = prefix * 1000 + newIdNumber;
        } else {
            instance.admin_id = prefix * 1000 + 1;
        }
    }

    public static associate(models: any) {
        Admin.belongsTo(models.Role, {
            foreignKey: 'role_id',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
        });
    }
}

export default Admin;
