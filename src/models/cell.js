const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cell extends Model {
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
      this.hasMany(models.Player, {
        foreignKey: 'id',
      });
      this.hasOne(models.Property, {
        foreignKey: 'id',
      });
    }
  }
  Cell.init({
    gameId: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Cell',
  });
  return Cell;
};
