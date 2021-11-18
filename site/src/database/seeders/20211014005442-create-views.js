'use strict';

const views = require('../../data/views');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Views', views, {});
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Views', null, {});
     
  }
};
