'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Outlet,{
        foreignKey:"Id"
      });
      // define association here
    }
  };
  Product.init({
    OutletId:DataTypes.INTEGER,
    Name: DataTypes.STRING,
    Image: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    Price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};