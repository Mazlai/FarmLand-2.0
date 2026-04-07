"use strict";

const { faker } = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const availableGenders = ["male", "female"];

    const userData = [];
    for (let i = 0; i < 10; i++) {
      userData.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        birthDate: faker.date.anytime(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        gender:
          availableGenders[
            Math.floor(Math.random() * availableGenders.length)
          ] ?? "",
        passwordHash: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("users", userData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
