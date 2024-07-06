const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cell, {
        foreignKey: 'id',
      });
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
    }
  }
  Game.init({
    initial_balance: DataTypes.INTEGER,
    turn: DataTypes.INTEGER,
    players: DataTypes.ARRAY(DataTypes.INTEGER),
    started: DataTypes.BOOLEAN,
    length: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
