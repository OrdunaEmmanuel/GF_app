const { pool } = require("../../CONFIGS/db.config");


//Query search all products
const ProductModel = {
    async getAllProducts() {
        const [rows] = await pool.query("SELECT * FROM producto");
        return rows;
    },

//Query search products by Id
    async getProductById(id) {
        const [rows] = await pool.query("SELECT * FROM producto WHERE codigo = ?", [id]);
        return rows[0];
    },
    
//Query search products by name, or key 
    async searchProducts(searchTerm) {
        const query = `
            SELECT * FROM producto 
            WHERE codigo LIKE ? OR clave LIKE ? OR descripcion LIKE ?`;
        
        const searchValue = `%${searchTerm}%`;
        const [rows] = await pool.query(query, [searchValue, searchValue, searchValue]);
        return rows;
    }   

};




module.exports = ProductModel;
