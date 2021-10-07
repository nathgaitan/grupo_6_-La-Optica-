'use strict';

const lens = require('../../data/lens')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Lens', lens, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Lens', null, {});

  }
};
