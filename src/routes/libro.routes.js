const express = require("express");
const router = express.Router();

const verificarToken = require("../middlewares/auth.middleware");
const controlador = require("../controllers/libro.controller");

router.get("/", controlador.listarLibros);
router.get("/:id", controlador.obtenerLibroPorId);
router.post("/", verificarToken, controlador.crearLibro);
router.put("/:id", verificarToken, controlador.actualizarLibro);
router.delete("/:id", verificarToken, controlador.eliminarLibro);

module.exports = router;