const express = require("express");
const router = express.Router();

const {
    registrar,
    login,
    restablecerPassword
} = require("../controllers/auth.controller");

router.post("/registro", registrar);
router.post("/login", login);
router.post("/restablecer-password", restablecerPassword);

module.exports = router;