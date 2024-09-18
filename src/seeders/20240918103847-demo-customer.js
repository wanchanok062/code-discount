'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'customers',
            [
                {
                    customer_id: uuidv4(),
                    first_name: 'John',
                    last_name: 'Doe',
                    user_name: 'johndoe',
                    password: 'password123',
                    role_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    customer_id: uuidv4(),
                    first_name: 'Jane',
                    last_name: 'Smith',
                    user_name: 'janesmith',
                    password: 'password123',
                    role_id: 2,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('customers', null, {});
    },
};
