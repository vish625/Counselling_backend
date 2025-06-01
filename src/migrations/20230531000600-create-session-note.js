'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SessionNotes', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      appointmentId: {
        type: Sequelize.INTEGER,
        references: { model: 'Appointments', key: 'id' }
      },
      note: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('SessionNotes');
  }
};
