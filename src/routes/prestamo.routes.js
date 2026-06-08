const verificarToken = require("../middlewares/auth.middleware");

const express = require("express");
const router = express.Router();

const {
    listarPrestamos,
    obtenerPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
} = require("../controllers/prestamo.controller");

router.get("/", verificarToken, listarPrestamos);
router.get("/:id", verificarToken, obtenerPrestamoPorId);
router.post("/", verificarToken, crearPrestamo);
router.put("/:id", verificarToken, actualizarPrestamo);
router.delete("/:id", verificarToken, eliminarPrestamo);

module.exports = router;