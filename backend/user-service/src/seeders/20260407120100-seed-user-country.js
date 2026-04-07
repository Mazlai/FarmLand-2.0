"use strict";

const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users;",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const updates = users.map((user) =>
      queryInterface.sequelize.query(
        "UPDATE users SET country = :country WHERE id = :id;",
        {
          replacements: {
            country: faker.location.country(),
            id: user.id,
          },
        }
      )
    );

    await Promise.all(updates);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "UPDATE users SET country = NULL;"
    );
  },
};
