const express = require("express");
const clientCTRL = require("../CONTROLLERS/clientController/client.ctrl");
const auth = require("../MIDDLEWARE/auth");

const router = express.Router();

// ✅ Rutas que deben ir primero (para evitar que /:id las capture)
router.get("/user", auth.verifyToken, clientCTRL.getUserData);
router.post("/refresh-token", clientCTRL.refreshToken);
router.post("/logout", auth.verifyToken, clientCTRL.logoutUser);

// ✅ Rutas extendidas para localidad y ruta
router.get("/localidades/:id", clientCTRL.getLocalidadById);
router.get("/rutas/:id", clientCTRL.getRutaById);

// ✅ Rutas relacionadas a clientes
router.post("/register", clientCTRL.createCliente);
router.post("/login", clientCTRL.loginUser);
router.get("/getAll", clientCTRL.getClientes);
router.put("/update/:id", clientCTRL.updateCliente);
router.delete("/delete/:id", clientCTRL.deleteCliente);

// ✅ Ruta dinámica (al final para evitar que capture otras rutas)
router.get("/:id", clientCTRL.getClienteById);

module.exports = router;
