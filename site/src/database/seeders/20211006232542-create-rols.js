'use strict';

const rols = require('../../data/rols');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Rols', rols, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rols', null, {});
    
  }
};