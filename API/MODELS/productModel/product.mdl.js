const { pool } = require("../../CONFIGS/db.config");

const ProductModel = {
  /**
   * Obtiene todos los productos con paginación.
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<{data: Array, total: number}>}
   */
  async getAllProducts(page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const [rows] = await pool.query(
      "SELECT * FROM producto LIMIT ? OFFSET ?",
      [parseInt(limit), parseInt(offset)]
    );
    const [[{ total }]] = await pool.query(
      "SELECT COUNT(*) AS total FROM producto"
    );
    return { data: rows, total };
  },

  /**
   * Obtiene un producto por su ID.
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getProductById(id) {
    const [rows] = await pool.query(
      "SELECT * FROM producto WHERE id_producto = ?",
      [id]
    );
    return rows[0];
  },

  /**
   * Crea un nuevo producto utilizando todos los campos de la tabla.
   * @param {Object} productData
   * @returns {Promise<number>} ID del producto creado.
   */
  async createProduct(productData) {
    const {
      codigo,
      clave,
      descripcion,
      margen_de_mercado,
      caja,
      master,
      precio,
      unidad,
      ean,
      precio_minimo,
      alta_rotacion,
      precio_mayoreo_con_IVA,
      precio_distribuidor_IVA,
      precio_publico_con_IVA,
      precio_mayoreo_sin_IVA,
      precio_distribuidor_sin_IVA,
      precio_publico_sin_IVA,
      marca,
      precio_medio_mayoreo_sin_IVA,
      precio_medio_mayoreo_con_IVA,
      codigo_SAT,
      descripcion_SAT,
      familia,
      descripcion_familia,
      peso_kg,
      volumen_cm3,
    } = productData;

    const [result] = await pool.query(
      `INSERT INTO producto (
        codigo, clave, descripcion, margen_de_mercado, caja, master, precio, unidad, ean, precio_minimo,
        alta_rotacion, precio_mayoreo_con_IVA, precio_distribuidor_IVA, precio_publico_con_IVA,
        precio_mayoreo_sin_IVA, precio_distribuidor_sin_IVA, precio_publico_sin_IVA, marca,
        precio_medio_mayoreo_sin_IVA, precio_medio_mayoreo_con_IVA, codigo_SAT, descripcion_SAT,
        familia, descripcion_familia, peso_kg, volumen_cm3
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        codigo,
        clave,
        descripcion,
        margen_de_mercado,
        caja,
        master,
        precio,
        unidad,
        ean,
        precio_minimo,
        alta_rotacion,
        precio_mayoreo_con_IVA,
        precio_distribuidor_IVA,
        precio_publico_con_IVA,
        precio_mayoreo_sin_IVA,
        precio_distribuidor_sin_IVA,
        precio_publico_sin_IVA,
        marca,
        precio_medio_mayoreo_sin_IVA,
        precio_medio_mayoreo_con_IVA,
        codigo_SAT,
        descripcion_SAT,
        familia,
        descripcion_familia,
        peso_kg,
        volumen_cm3,
      ]
    );
    return result.insertId;
  },

  /**
   * Busca productos por término (en código, clave o descripción) con paginación.
   * @param {string} searchTerm
   * @param {number} page
   * @param {number} limit
   * @returns {Promise<{data: Array, total: number}>}
   */
  async searchProducts(searchTerm, page = 1, limit = 50) {
    const offset = (page - 1) * limit;
    const value = `%${searchTerm}%`;
    const [rows] = await pool.query(
      `SELECT * FROM producto
         WHERE codigo LIKE ? OR clave LIKE ? OR descripcion LIKE ?
         LIMIT ? OFFSET ?`,
      [value, value, value, parseInt(limit), parseInt(offset)]
    );
    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM producto
         WHERE codigo LIKE ? OR clave LIKE ? OR descripcion LIKE ?`,
      [value, value, value]
    );
    return { data: rows, total };
  },
};

module.exports = ProductModel;
