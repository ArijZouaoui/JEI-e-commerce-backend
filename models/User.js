const Sequelize = require("sequelize");
const sequelize = require("../database/connection");
module.exports = sequelize.define("User", {
  id: {
    type: Sequelize.STRING(50),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  //this will throw a SequelizeUniqueConstraintError if a query is sent with an already existant email
  email: { type: Sequelize.STRING(50), allowNull: false, unique: true },
  userName: { type: Sequelize.STRING(50), allowNull: false, unique: true },
  address: { type: Sequelize.STRING(300), allowNull: false },
  phoneNumber: { type: Sequelize.INTEGER(20), allowNull: false },
  email: { type: Sequelize.STRING(50), allowNull: false },
  admin: { type: Sequelize.INTEGER(11), allowNull: false },
  password: { type: Sequelize.INTEGER(300), allowNull: false },
});
