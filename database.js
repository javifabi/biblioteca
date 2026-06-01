const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("biblioteca_db", "root", "Stomas.2023", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;