'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Messages', [
      {
        message: 'First message.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Second message.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        message: 'Third message.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Messages', null, {});
  }
};
