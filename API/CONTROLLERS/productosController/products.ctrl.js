const ProductModel = require("../../MODELS/productsModels/products.mdl");

const ProductController = {
    async getAll(req, res) {
        try {
            const products = await ProductModel.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los productos" });
            console.log(error)
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const product = await ProductModel.getProductById(id);
            if (!product) return res.status(404).json({ error: "Producto no encontrado" });
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener el producto" });
        }
    },

    async create(req, res) {
        try {
            const productId = await ProductModel.createProduct(req.body);
            res.status(201).json({ message: "Producto creado", id: productId });
        } catch (error) {
            res.status(500).json({ error: "Error al crear el producto" });
        }
    },

    async search(req, res) {
        try {
            const { term } = req.body;  // Obtener el término desde el frontend
            if (!term) {
                return res.status(400).json({ error: "Se requiere un término de búsqueda" });
            }
            const products = await ProductModel.searchProducts(term);
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: "Error en la búsqueda de productos" });
            console.log(error)
        }
    }

};

module.exports = ProductController;
