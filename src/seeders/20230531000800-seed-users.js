'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Get role IDs first
    const roles = await queryInterface.sequelize.query(
      `SELECT id, name FROM Roles;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const roleMap = {};
    roles.forEach(role => {
      roleMap[role.name] = role.id;
    });

    await queryInterface.bulkInsert('Users', [
      {
        username: 'student1',
        email: 'student1@example.com',
        password: 'hashedpassword1', // Use hashed values in real app
        roleId: roleMap['Student'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mam1',
        email: 'mam1@example.com',
        password: 'hashedpassword2',
        roleId: roleMap['Mam'],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'hod1',
        email: 'hod1@example.com',
        password: 'hashedpassword3',
        roleId: roleMap['HOD'],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
