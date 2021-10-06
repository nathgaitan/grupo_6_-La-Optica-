'use strict';

const frames = require('../../data/frames');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Frames', frames, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Frames', null, {});

  }
};
