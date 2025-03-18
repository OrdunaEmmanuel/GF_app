const { pool } = require("../../CONFIGS/db.config");

const ProductModel = {
    async getAllProducts() {
        const [rows] = await pool.query("SELECT * FROM productos");
        return rows;
    },

    async getProductById(id) {
        const [rows] = await pool.query("SELECT * FROM productos WHERE codigo = ?", [id]);
        return rows[0];
    },

    async createProduct(productData) {
        const {
            codigo, clave, descripcion, margen_mercado, caja, master, precio, unidad, ean,
            precio_minimo_venta, alta_rotacion, precio_mayoreo_iva, precio_distribuidor_iva,
            precio_publico_iva, precio_mayoreo_sin_iva, precio_distribuidor_sin_iva,
            precio_publico_sin_iva, marca, precio_medio_mayoreo_sin_iva, 
            precio_medio_mayoreo_con_iva, codigo_sat, descripcion_sat, familia, 
            descripcion_familia, peso_kg, volumen_cm3
        } = productData;

        const query = `
            INSERT INTO productos (
                codigo, clave, descripcion, margen_mercado, caja, master, precio, unidad, ean,
                precio_minimo_venta, alta_rotacion, precio_mayoreo_iva, precio_distribuidor_iva,
                precio_publico_iva, precio_mayoreo_sin_iva, precio_distribuidor_sin_iva,
                precio_publico_sin_iva, marca, precio_medio_mayoreo_sin_iva, 
                precio_medio_mayoreo_con_iva, codigo_sat, descripcion_sat, familia, 
                descripcion_familia, peso_kg, volumen_cm3
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(query, [
            codigo, clave, descripcion, margen_mercado, caja, master, precio, unidad, ean,
            precio_minimo_venta, alta_rotacion, precio_mayoreo_iva, precio_distribuidor_iva,
            precio_publico_iva, precio_mayoreo_sin_iva, precio_distribuidor_sin_iva,
            precio_publico_sin_iva, marca, precio_medio_mayoreo_sin_iva, 
            precio_medio_mayoreo_con_iva, codigo_sat, descripcion_sat, familia, 
            descripcion_familia, peso_kg, volumen_cm3
        ]);

        return result.insertId;
    }
};

module.exports = ProductModel;
