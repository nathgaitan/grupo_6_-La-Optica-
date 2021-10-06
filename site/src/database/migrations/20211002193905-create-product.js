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
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Marks',
          },
          key : 'id'
        }
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,

      },
      discount: {
        type: Sequelize.INTEGER
      },
      colorId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Colors',
          },
          key : 'id'
        }
      },
      detail: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      code: {
        type: Sequelize.STRING
      },
      lensId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Lens',
          },
          key : 'id'
        }
      },
      frameId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Frames',
          },
          key : 'id'
        }
      },
      graduationId: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'Graduations',
          },
          key : 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model : {
            tableName : 'Categories',
          },
          key : 'id'
        }
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