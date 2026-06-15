const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.MYSQLDATABASE || process.env.DB_NAME,
    process.env.MYSQLUSER || process.env.DB_USER,
    process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
    {
        host: process.env.MYSQLHOST || process.env.DB_HOST,
        port: process.env.MYSQLPORT || 3306,
        dialect: "mysql"
    }
);

module.exports = sequelize;