'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Slots', [
      {
        counsellorId: 2, // Replace with Mam's user ID
        date: new Date('2025-06-01'),
        startTime: new Date('2025-06-01T10:00:00'),
        endTime: new Date('2025-06-01T11:00:00'),
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        counsellorId: 2,
        date: new Date('2025-06-01'),
        startTime: new Date('2025-06-01T11:00:00'),
        endTime: new Date('2025-06-01T12:00:00'),
        isAvailable: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Slots', null, {});
  }
};
