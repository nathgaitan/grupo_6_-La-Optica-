'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Frame.belongsToMany(models.Product, {
        as : 'Products',        
        foreignKey: 'FrameId',
        through : "Frame-product",
        otherKey: "ProductsId"
        
      }) 
    }
  };
  Frame.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Frame',
  });
  return Frame;
};