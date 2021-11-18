'use strict';

const lenses = require('../../data/lenses')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lens', lenses, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lens', null, {});

  }
};