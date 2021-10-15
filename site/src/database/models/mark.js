'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mark.hasMany(models.Product, {
        as : 'products',        
        foreignKey: 'markId'
      }) 
    }
  };
  Mark.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mark',
  });
  return Mark;
};