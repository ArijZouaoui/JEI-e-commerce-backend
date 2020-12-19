const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
module.exports = sequelize.define("Product", {
  id: {
    type: Sequelize.STRING(50),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: Sequelize.STRING(25), allowNull: false },
  quantity: { type: Sequelize.INTEGER(2), allowNull: true },
  category: { type: Sequelize.STRING(25), allowNull: false },
  description: { type: Sequelize.STRING(300), allowNull: false },
  price: { type: Sequelize.INTEGER(10), allowNull: false },
  image: { type: Sequelize.STRING(300), allowNull: false },

});
