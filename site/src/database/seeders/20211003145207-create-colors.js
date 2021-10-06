'use strict';

const colors = require('../../data/colors');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Colors', colors, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Colors', null, {});

  }
};