"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Commandes", {
      id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      orderDate: { type: Sequelize.DATE, allowNull: false },
      deliveryDate: { type: Sequelize.DATE, allowNull: false },
      cartId: {
        type: Sequelize.STRING(50),

        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Commandes");
  },
};
