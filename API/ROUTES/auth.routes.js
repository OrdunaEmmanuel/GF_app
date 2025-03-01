const express = require("express");
const router = express.Router();
const authController = require("../CONTROLLERS/auth.ctrl");

// Ruta para registrar un nuevo cliente
router.post("/register", authController.createCliente);

// Ruta para obtener todos los clientes
router.get("/clients", authController.getClientes);

module.exports = router;
