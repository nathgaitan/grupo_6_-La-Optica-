'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Banner.belongsTo(models.View, {
        as : 'view',
        foreignKey : 'viewId'
      })
    }
  };
  Banner.init({
    file: DataTypes.STRING,
    description: DataTypes.STRING,
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};