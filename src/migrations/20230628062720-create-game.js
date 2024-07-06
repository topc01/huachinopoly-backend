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
        defaultValue: 100000,
        type: Sequelize.INTEGER,
      },
      turn: {
        defaultValue: 0,
        type: Sequelize.INTEGER,
        set(value) {
          this.setDataValue('turn', value % this.players.length);
        },
      },
      players: {
        defaultValue: [],
        type: Sequelize.ARRAY(Sequelize.INTEGER),
      },
      length: {
        defaultValue: 40,
        type: Sequelize.INTEGER,
      },
      started: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
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
