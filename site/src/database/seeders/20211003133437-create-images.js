'use strict';

const imagesJS = require('../../data/images');

const images = [];

const box = imagesJS.map(file => {
  let littlebox = {
    ...file,
    createdAt: new Date,
    updatedAt: new Date
  }
  images.push(littlebox)
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Images', images, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Images', null, {});

  }
};
