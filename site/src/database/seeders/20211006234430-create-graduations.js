'use strict';

const graduations = require('../../data/graduations');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Graduations', graduations, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Graduations', null, {});

  }
};
