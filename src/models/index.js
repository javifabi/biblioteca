const Libro = require("./libro.model");
const Prestamo = require("./prestamo.model");
const Usuario = require("./usuario.model");

Libro.hasMany(Prestamo, {
    foreignKey: "libroId"
});

Prestamo.belongsTo(Libro, {
    foreignKey: "libroId"
});

module.exports = {
    Libro,
    Prestamo,
    Usuario
};