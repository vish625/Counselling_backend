'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Appointments', [
      {
        studentId: 1,  // Replace with actual student ID
        slotId: 1,     // Replace with valid slot ID
        status: 'booked',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Appointments', null, {});
  }
};
