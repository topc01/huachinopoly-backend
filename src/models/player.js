const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {
        foreignKey: 'gameId',
      });
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      // this.hasOne(models.Cell, {
      //   foreignKey: 'cellId',
      // });
      this.hasMany(models.Property, {
        foreignKey: 'id',
      });
    }
  }
  Player.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    gameId: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    jail: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
