'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('customers', 'customer_id', {
            type: Sequelize.STRING,
            allowNull: false,
        });

        await queryInterface.changeColumn('customers', 'password', {
            type: Sequelize,
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('customers', 'customer_id', {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        });

        await queryInterface.changeColumn('customers', 'password', {
            type: Sequelize,
            allowNull: false,
        });
    },
};
