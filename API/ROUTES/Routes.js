const express = require('express');
const router = express.Router();
const clientController = require("../CONTROLLERS/clientController/client.ctrl");
const ProductController = require("../CONTROLLERS/productosController/products.ctrl");
const OrderController = require("../CONTROLLERS/productosController/order.ctrl");

// Routes client
router.post('/register', clientController.createCliente);
router.post('/getClientes', clientController.getClientes);

// Routes products
router.get('/productos', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const result = await ProductController.getAllProducts(page, limit);
        res.json(result);
    } catch (err) {
        console.error("Error en /productos:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
});

router.get("/getbyId/:id", ProductController.getById);
router.post("/buscarByname", ProductController.search);

// Routes orders
router.post("/add-product", OrderController.addProductAndCreateOrderIfNeeded);
router.get("/productos/:id_pedido", OrderController.getProductsByOrder);
router.get("/user/:id_usuario", OrderController.getAll);
router.get("/orders", OrderController.getOrders);

module.exports = router;