const Prestamo = require("../models/prestamo.model");

const listarPrestamos = async (req, res) => {
    try {
        const prestamos = await Prestamo.findAll();
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al listar préstamos", error });
    }
};

const obtenerPrestamoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findByPk(id);

        if (!prestamo) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        res.json(prestamo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener préstamo", error });
    }
};

const crearPrestamo = async (req, res) => {
    try {
        const {
            nombreUsuario,
            fechaPrestamo,
            fechaDevolucion,
            estado,
            libroId
        } = req.body;

        if (!nombreUsuario || !fechaPrestamo || !libroId) {
            return res.status(400).json({
                mensaje: "El nombre de usuario, la fecha de préstamo y el libroId son obligatorios"
            });
        }

        const prestamo = await Prestamo.create({
            nombreUsuario,
            fechaPrestamo,
            fechaDevolucion,
            estado,
            libroId
        });

        res.status(201).json(prestamo);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear préstamo", error });
    }
};

const actualizarPrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombreUsuario,
            fechaPrestamo,
            fechaDevolucion,
            estado,
            libroId
        } = req.body;

        const prestamo = await Prestamo.findByPk(id);

        if (!prestamo) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        await prestamo.update({
            nombreUsuario,
            fechaPrestamo,
            fechaDevolucion,
            estado,
            libroId
        });

        res.json({
            mensaje: "Préstamo actualizado correctamente",
            prestamo
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar préstamo", error });
    }
};

const eliminarPrestamo = async (req, res) => {
    try {
        const { id } = req.params;

        const prestamo = await Prestamo.findByPk(id);

        if (!prestamo) {
            return res.status(404).json({ mensaje: "Préstamo no encontrado" });
        }

        await prestamo.destroy();

        res.json({ mensaje: "Préstamo eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar préstamo", error });
    }
};

module.exports = {
    listarPrestamos,
    obtenerPrestamoPorId,
    crearPrestamo,
    actualizarPrestamo,
    eliminarPrestamo
};