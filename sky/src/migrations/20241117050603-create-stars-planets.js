"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("StarsPlanets", {
      starId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Stars",
          key: "id",
        },
      },
      planetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Planets",
          key: "id",
        },
      },
      galaxyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Galaxies",
          key: "id",
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("StarsPlanets");
  },
};
