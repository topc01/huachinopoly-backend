/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
      },
      name: {
        type: Sequelize.STRING,
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' },
      },
      current_balance: {
        type: Sequelize.INTEGER,
      },
      cellId: {
        type: Sequelize.INTEGER,
        references: { model: 'Cells', key: 'id' },
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
    await queryInterface.dropTable('Players');
  },
};
