'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      markId: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,

      },
      discount: {
        type: Sequelize.INTEGER
      },
      colorId: {
        type: Sequelize.INTEGER
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      code: {
        type: Sequelize.STRING
      },
      lensId: {
        type: Sequelize.INTEGER
      },
      frameId: {
        type: Sequelize.INTEGER
      },
      graduationId: {
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};