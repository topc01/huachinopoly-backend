/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      initial_balance: {
        type: Sequelize.INTEGER,
        defaultValue: 100000,
      },
      round: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      count_players: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      min_players: {
        type: Sequelize.INTEGER,
        defaultValue: 2,
      },
      max_players: {
        type: Sequelize.INTEGER,
        defaultValue: 4,
      },
      winner: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Games');
  },
};
