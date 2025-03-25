const { pool } = require("../../CONFIGS/db.config");


//Query search all products
const ProductModel = {
    async getAllProducts(page = 1, limit = 50) {
        const offset = (page - 1) * limit;
        const [rows] = await pool.query("SELECT * FROM producto LIMIT ? OFFSET ?", [parseInt(limit), parseInt(offset)]);
        const [[{ total }]] = await pool.query("SELECT COUNT(*) AS total FROM producto");
        return { data: rows, total };
    }

    ,

    //Query search products by Id
    async getProductById(id) {
        const [rows] = await pool.query("SELECT * FROM producto WHERE id_producto = ?", [id]);
        return rows[0];
    },

    //Query search products by name, or key 
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
    }

};




module.exports = ProductModel;
