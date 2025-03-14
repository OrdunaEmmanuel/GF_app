// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const authController = require("../CONTROLLERS/auth.ctrl");

// Ruta para iniciar sesión
router.post("/login", authController.login);

// Ruta para cerrar sesión (protegida por el middleware de autenticación)
router.post("/logout", authController.authenticate, authController.logout);

// Ruta para obtener la información del usuario autenticado
router.get("/me", authController.authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    usuario: req.user,
  });
});

module.exports = router;