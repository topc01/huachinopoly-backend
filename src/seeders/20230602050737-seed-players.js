module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [
    {
      name: 'el pro',
      userId: 1,
      gameId: null,
      current_balance: null,
      cellId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'el seco',
      userId: 2,
      gameId: null,
      current_balance: null,
      cellId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'el maquina',
      userId: 2,
      gameId: null,
      current_balance: null,
      cellId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};
