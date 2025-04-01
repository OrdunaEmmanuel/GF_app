const express = require('express');
const router=express.Router();
const clientController=require("../CONTROLLERS/clientController/client.ctrl")
const ProductController=require("../CONTROLLERS/productController/product.ctrl")

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

module.exports = router;