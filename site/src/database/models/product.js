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
      // define association here
    }
  };
  Product.init({
    name: DataTypes.STRING,
    markId: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    detail: DataTypes.STRING,
    code: DataTypes.INTEGER,
    lensId: DataTypes.INTEGER,
    frameId: DataTypes.INTEGER,
    graduationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};