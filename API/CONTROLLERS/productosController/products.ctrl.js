const ProductModel = require("../../MODELS/productsModels/products.mdl");

const ProductController = {
  /**
   * Obtiene todos los productos con paginación.
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<Object>}
   */
  async getAllProducts(page = 1, limit = 50) {
    try {
      page = parseInt(page) || 1;
      limit = parseInt(limit) || 50;
      if (page < 1 || limit < 1) {
        throw new Error("Parámetros de paginación inválidos");
      }
      return await ProductModel.getAllProducts(page, limit);
    } catch (err) {
      console.error("Error en ProductController.getAllProducts:", err);
      throw err;
    }
  },

  /**
   * Obtiene un producto por su ID.
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          success: false,
          error: "ID de producto no proporcionado",
        });
      }
      const product = await ProductModel.getProductById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: "Producto no encontrado",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error("Error en ProductController.getById:", error);
      res.status(500).json({
        success: false,
        error: "Error interno al obtener el producto",
      });
    }
  },

  /**
   * Crea un nuevo producto.
   */
  async create(req, res) {
    try {
      const productData = req.body;
      if (!productData || Object.keys(productData).length === 0) {
        return res.status(400).json({
          success: false,
          error: "Datos del producto no proporcionados",
        });
      }
      const productId = await ProductModel.createProduct(productData);
      res.status(201).json({
        success: true,
        message: "Producto creado exitosamente",
        id: productId,
      });
    } catch (error) {
      console.error("Error en ProductController.create:", error);
      res.status(500).json({
        success: false,
        error: "Error interno al crear el producto",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },

  /**
   * Busca productos por término de búsqueda con paginación.
   */
  async search(req, res) {
    try {
      const { term } = req.body;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 50;
      if (!term || term.trim() === "") {
        return res.status(200).json({
          success: true,
          data: [],
          total: 0,
          message: "No se proporcionó término de búsqueda",
        });
      }
      const result = await ProductModel.searchProducts(term, page, limit);
      res.status(200).json({
        success: true,
        data: result.data,
        total: result.total,
        page,
        limit,
      });
    } catch (error) {
      console.error("Error en ProductController.search:", error);
      res.status(500).json({
        success: false,
        error: "Error interno al buscar productos",
      });
    }
  },
};

module.exports = ProductController;
