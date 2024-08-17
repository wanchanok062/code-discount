'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: { type: Sequelize.INTEGER, autoIncrement: true },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    },
};
