"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("animal_types", [
      {
        label: "Chat",
        textIcon: "😺",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Chien",
        textIcon: "🐶",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Cheval",
        textIcon: "🐴",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Vache",
        textIcon: "🐮",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Cochon",
        textIcon: "🐷",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Canard",
        textIcon: "🦆",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Mouton",
        textIcon: "🐑",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Chèvre",
        textIcon: "🐐",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Poule",
        textIcon: "🐔",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        label: "Lapin",
        textIcon: "🐰",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("animal_types", null, {});
  },
};
