const express = require('express');
const router = express.Router();
const clientController = require("../CONTROLLERS/clientController/client.ctrl")
const ProductController = require("../CONTROLLERS/productosController/products.ctrl")
const queryParser = require('../MIDDLEWARE/queryParser');

//routes client
router.post('/register', clientController.createCliente) +
    router.post('/getClientes', clientController.getClientes)
//routes products
router.get('/productos', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const result = await ProductController.getAllProducts(page, limit);
        res.json(result);
    } catch (err) {
        console.error("Error en /productos:", err); // 👈 ESTA LÍNEA DEBERÍA MOSTRAR ALGO EN LA TERMINAL
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/getbyId/:id", ProductController.getById);
router.get('/productos/buscar', queryParser, async (req, res) => {
    try {
        const { q, page, limit } = req.paginacion;
        const result = await ProductController.searchProducts(q, page, limit);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Error al buscar productos" });
    }
});

module.exports = router