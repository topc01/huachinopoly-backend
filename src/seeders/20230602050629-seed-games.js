module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      initial_balance: 100_000,
      round: 0,
      // "winner": null,
      // "count_players": null,
      min_players: 2,
      max_players: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      initial_balance: 70_000,
      round: 0,
      // "winner": null,
      // "count_players": null,
      min_players: 3,
      max_players: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};
