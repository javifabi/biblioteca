const authRoutes = require("./routes/auth.routes");
const express = require("express");
const cors = require("cors");
const path = require("path");

const libroRoutes = require("./routes/libro.routes");
const prestamoRoutes = require("./routes/prestamo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.send("API Biblioteca funcionando");
});

app.use("/api/libros", libroRoutes);
app.use("/api/prestamos", prestamoRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;