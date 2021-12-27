'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Outlet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Outlet.belongsTo(models.Product,{
        as:"Product",
        foreignKey:"Id"
      });
    }
  };
  Outlet.init({
    BrandId: DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    Latitude: DataTypes.DOUBLE,
    Longitude: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Outlet',
  });
  return Outlet;
};