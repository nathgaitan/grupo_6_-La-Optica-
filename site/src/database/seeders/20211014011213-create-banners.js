'use strict';

const bannersJS = require('../../data/banners');

const banners = [];

const box = bannersJS.map(file => {
  let littlebox = {
    ...file,
    createdAt: new Date,
    updatedAt: new Date
  }
  banners.push(littlebox)
})


module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Banners', banners, {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {});

  }
};