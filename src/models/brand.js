'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.belongsTo(models.Product,{
        as:"Product",
        foreignKey:"Id"
      });
    }
  };
  Brand.init({
    Name: DataTypes.STRING,
    Logo: DataTypes.STRING,
    Status: DataTypes.BOOLEAN,
    Banner: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};