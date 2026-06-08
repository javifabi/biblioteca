const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Prestamo = sequelize.define("Prestamo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaPrestamo: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    fechaDevolucion: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "activo"
    },
    libroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Prestamo;