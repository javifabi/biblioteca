const Libro = require("../models/libro.model");

const listarLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar libros", error });
    }
};

const obtenerLibroPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const libro = await Libro.findByPk(id);

        if (!libro) {
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }

        res.json(libro);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener libro", error });
    }
};

const crearLibro = async (req, res) => {
    try {
        const { titulo, autor, anio } = req.body;

        if (!titulo || !autor) {
            return res.status(400).json({
                mensaje: "El título y el autor son obligatorios"
            });
        }

        const libro = await Libro.create({
            titulo,
            autor,
            anio
        });

        res.status(201).json(libro);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear libro", error });
    }
};

const actualizarLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, anio } = req.body;

        const libro = await Libro.findByPk(id);

        if (!libro) {
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }

        await libro.update({
            titulo,
            autor,
            anio
        });

        res.json({
            mensaje: "Libro actualizado correctamente",
            libro
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar libro", error });
    }
};

const eliminarLibro = async (req, res) => {
    try {
        const { id } = req.params;

        const libro = await Libro.findByPk(id);

        if (!libro) {
            return res.status(404).json({ mensaje: "Libro no encontrado" });
        }

        await libro.destroy();

        res.json({ mensaje: "Libro eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar libro", error });
    }
};

module.exports = {
    listarLibros,
    obtenerLibroPorId,
    crearLibro,
    actualizarLibro,
    eliminarLibro
};