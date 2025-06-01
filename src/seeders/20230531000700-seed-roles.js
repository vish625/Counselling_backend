'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Roles',
      [
        { name: 'Student', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Mam',     createdAt: new Date(), updatedAt: new Date() },
        { name: 'HOD',     createdAt: new Date(), updatedAt: new Date() }
      ],
      {
        ignoreDuplicates: true  // skips any already‐existing "name" entries
      }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
