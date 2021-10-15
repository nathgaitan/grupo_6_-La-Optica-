'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class View extends Model {
    
    static associate(models) {
      View.hasMany(models.Banner, {
        as : "banners",
        foreignKey : "viewId"
      })
    }
  };
  View.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'View',
    timestamps : false
  });
  return View;
};