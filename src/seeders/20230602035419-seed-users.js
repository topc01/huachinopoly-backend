module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'admin',
      mail: 'adm@gmail.cl',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'pepito',
      mail: 'pepito123@aaa.com',
      password: 'peperoni',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'cristiano',
      mail: 'futbol@u.com',
      password: 'ronaldo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'messi',
      mail: 'leo@arg.com',
      password: 'pelota',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

// 'use strict';

// /** @type {import('sequelize-cli').Migration} */
// module.exports = {
//   async up (queryInterface, Sequelize) {
//     /**
//      * Add seed commands here.
//      *
//      * Example:
//      * await queryInterface.bulkInsert('People', [{
//      *   name: 'John Doe',
//      *   isBetaMember: false
//      * }], {});
//     */
//   },

//   async down (queryInterface, Sequelize) {
//     /**
//      * Add commands to revert seed here.
//      *
//      * Example:
//      * await queryInterface.bulkDelete('People', null, {});
//      */
//   }
// };
