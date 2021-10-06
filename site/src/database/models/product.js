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
    name:{
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'name' no pude ser nulo"
        },
        notEmpty : {
          msg : "El nombre del producto es requerido"
        }
      }
  },
    markId: DataTypes.INTEGER,
    price:{
      type : DataTypes.DECIMAL,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'price' no pude ser nulo"
        },
        notEmpty : {
          msg : "El precio del producto es requerido"
        }
      }
  },
    discount: DataTypes.INTEGER,
    colorId: DataTypes.INTEGER,
    detail: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'detail' no pude ser nulo"
        },
        notEmpty : {
          msg : "El detalle del producto es requerido"
        }
      }
  },
    code: DataTypes.INTEGER,
    lensId: DataTypes.INTEGER,
    frameId: DataTypes.INTEGER,
    graduationId: DataTypes.INTEGER,
    categoryId:{
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'categoryId' no pude ser nulo"
        },
        notEmpty : {
          msg : "La categoria del producto es requerido"
        }
      }
  },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};