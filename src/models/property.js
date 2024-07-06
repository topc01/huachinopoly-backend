const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Player, {
        foreignKey: 'playerId',
      });
      // this.belongsTo(models.Cell, {
      //   foreignKey: 'cellId',
      // });
    }
  }
  Property.init({
    playerId: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    name: DataTypes.STRING,
    value: DataTypes.INTEGER,
    rent: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};
