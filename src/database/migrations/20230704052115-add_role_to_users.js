"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "role", {
      type: Sequelize.ENUM("client", "manager", "employee", "admin"),
      defaultValue: "client",
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("users", "role");
  },
};
