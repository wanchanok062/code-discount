'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         */
        const now = new Date();
        await queryInterface.bulkInsert(
            'role',
            [
                {
                    role_name: 'admin',
                    createdAt: now,
                    updatedAt: now,
                },
                {
                    role_name: 'user',
                    createdAt: now,
                    updatedAt: now,
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         */
        await queryInterface.bulkDelete('role', null, {});
    },
};
