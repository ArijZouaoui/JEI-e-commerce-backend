const Sequelize = require("sequelize");
const sequelize = require("../database/connection");

module.exports = sequelize.define("Cart", {
  id: {
    type: Sequelize.STRING(50),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: { type: Sequelize.STRING(50), allowNull: false },
  //nb max de produits dans le basket est 27
});
