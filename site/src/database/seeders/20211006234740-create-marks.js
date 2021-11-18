'use strict';

const marks = require('../../data/marks');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Marks', marks, {});

  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Marks', null, {});

  }
};