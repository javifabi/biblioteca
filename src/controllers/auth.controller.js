const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model");

const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                mensaje: "Nombre, email y password son obligatorios"
            });
        }

        const usuarioExiste = await Usuario.findOne({ where: { email } });

        if (usuarioExiste) {
            return res.status(400).json({
                mensaje: "El email ya está registrado"
            });
        }

        const passwordEncriptada = await bcrypt.hash(password, 10);

        const usuario = await Usuario.create({
            nombre,
            email,
            password: passwordEncriptada
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al registrar usuario", error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Email y password son obligatorios"
            });
        }

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({
                mensaje: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET || "secreto_temporal",
            {
                expiresIn: "1h"
            }
        );

        res.json({
            mensaje: "Login correcto",
            token
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al iniciar sesión", error });
    }
};

module.exports = {
    registrar,
    login
};