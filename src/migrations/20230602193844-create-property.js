/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      playerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
      },
      cellId: {
        type: Sequelize.INTEGER,
        references: { model: 'Cells', key: 'id' },
      },
      name: {
        type: Sequelize.STRING,
      },
      house_value: {
        type: Sequelize.INTEGER,
      },
      hotel_value: {
        type: Sequelize.INTEGER,
      },
      house_rent: {
        type: Sequelize.INTEGER,
      },
      hotel_rent: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Properties');
  },
};
