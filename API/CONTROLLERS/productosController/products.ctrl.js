const ProductModel = require("../../MODELS/productsModels/products.mdl");

const ProductController = {
    async getAllProducts(page, limit) {
        try {
            return await ProductModel.getAllProducts(page, limit);
        } catch (err) {
            console.error("Error interno en getAllProducts (ctrl):", err);
            throw err;
        }
    }
    ,

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

    async searchProducts(term, page, limit) {
        if (!term) {
            return { data: [], total: 0 };
        }
        return await ProductModel.searchProducts(term, page, limit);
    }


};

module.exports = ProductController;
