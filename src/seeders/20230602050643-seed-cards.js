module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Cards', [
    {
      description: 'Ve a la carcel',
      type: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: 'Avanza 3 casillas',
      type: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      description: 'Ganas $20.000',
      type: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Cards', null, {}),
};
