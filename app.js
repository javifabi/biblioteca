const express = require("express");
require("dotenv").config();

const sequelize = require("./database");
const Libro = require("./Libro");

const app = express();

app.use(express.json());

// Conexión a MySQL
sequelize.authenticate()
    .then(() => {
        console.log("Conexión a MySQL exitosa");
    })
    .catch((error) => {
        console.error("Error al conectar a MySQL:", error);
    });

// Crear tablas automáticamente
sequelize.sync()
    .then(() => {
        console.log("Tabla Libro sincronizada");
    })
    .catch((error) => {
        console.error("Error al sincronizar:", error);
    });

// Página principal
app.get("/", (req, res) => {
    res.send("Biblioteca funcionando");
});

// Ver todos los libros
app.get("/libros", async (req, res) => {
    const libros = await Libro.findAll();
    res.json(libros);
});

// Agregar un libro de prueba
app.get("/agregar-libro", async (req, res) => {
    const libro = await Libro.create({
        titulo: "Don Quijote",
        autor: "Miguel de Cervantes",
        anio: 1605
    });

    res.json(libro);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en puerto ${PORT}`);
});