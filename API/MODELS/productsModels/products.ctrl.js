const { pool } = require("../../CONFIGS/db.config");

const ProductModel = {
    async getAllProducts() {
        const [rows] = await pool.query("SELECT * FROM producto");
        return rows;
    },

    async getProductById(id) {
        const [rows] = await pool.query("SELECT * FROM producto WHERE codigo = ?", [id]);
        return rows[0];
    }
};

module.exports = ProductModel;
