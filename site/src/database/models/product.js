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
      Product.belongsTo(models.Category,{
        as : 'Category',
        foreignKey: 'categoryId'
      })
      Product.hasMany(models.Image, {
        as : 'Images',
        foreignKey: 'imagesId'
      })
      Product.hasMany(models.Mark, {
        as : 'Marks',
        foreignKey: 'marksId'
      }) 
      Product.belongsTo(models.Color, {
        as : 'Color',
        foreignKey: 'colorId'
      })  
      Product.belongsTo(models.Graduation, {
        as : 'Graduation',
        foreignKey: 'graduationId'
      })  
      Product.belongsTo(models.Lens, {
        as : 'Lens',
        foreignKey: 'lensId'
      }) 
      Product.belongsTo(models.Lens, {
        as : 'Frame',
        foreignKey: 'frameId'
      })     
      
    

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
      type : DataTypes.STRING(500),
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
    code: DataTypes.STRING,
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