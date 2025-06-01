'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Appointments', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' }
      },
      slotId: {
        type: Sequelize.INTEGER,
        references: { model: 'Slots', key: 'id' }
      },
      status: Sequelize.STRING, // e.g., "pending", "approved"
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Appointments');
  }
};
