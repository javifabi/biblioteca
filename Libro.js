const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Libro = sequelize.define("Libro", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    anio: {
        type: DataTypes.INTEGER
    }
});

module.exports = Libro;