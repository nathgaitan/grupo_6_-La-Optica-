'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Rol,{
        as : 'rol',
        foreignKey : 'rolId'
      })
      User.belongsToMany(models.Product, {
        as : 'products',
        through : 'Carts',
        foreignKey : 'userId',
        otherKey : 'productId'
      })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'name' no pude ser nulo"
        },
        notEmpty : {
          msg : "El nombre del usuario es requerido"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'lastName' no pude ser nulo"
        },
        notEmpty : {
          msg : "El apellido del usuario es requerido"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'email' no pude ser nulo"
        },
        notEmpty : {
          msg : "El email es requerido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "El campo 'password' no pude ser nulo"
        },
        notEmpty : {
          msg : "La contraseña es requerido"
        }
      }
    },
    rolId: DataTypes.INTEGER,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};