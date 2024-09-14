import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'role',
})
export class Role extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    })
    role_id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    role_name!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    createdAt!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
}
export default Role;
