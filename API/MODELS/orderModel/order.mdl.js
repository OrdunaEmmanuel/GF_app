const { pool } = require("../../CONFIGS/db.config");

const OrderModel = {
    async getOrders(id_usuario) {
        const [rows] = await pool.query("SELECT * FROM pedido");
        return rows;
    },

    async getOrdersByUser(id_usuario) {
        const [rows] = await pool.query("SELECT * FROM pedido WHERE id_usuario = ?", [id_usuario]);
        return rows;
    },

    async getOrderById(id_pedido) {
        const [rows] = await pool.query("SELECT * FROM pedido WHERE id_pedido = ?", [id_pedido]);
        return rows[0];
    },

    async createOrder({ estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_usuario }) {
        const query = `
            INSERT INTO pedido (estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_usuario) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        const [result] = await pool.query(query, [estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_usuario]);
        return result.insertId;
    },

    async searchOrders(searchTerm, id_usuario) {
        const searchValue = `%${searchTerm}%`;
        const query = `
            SELECT * FROM pedido 
            WHERE id_usuario = ? AND (direccion LIKE ? OR estado LIKE ? OR metodo_de_pago LIKE ?)`;
        const [rows] = await pool.query(query, [id_usuario, searchValue, searchValue, searchValue]);
        return rows;
    },

    async getPendingOrderByUser(id_usuario) {
        const [rows] = await pool.query(`
            SELECT * FROM pedido 
            WHERE id_usuario = ? AND estado = 'pendiente'
            ORDER BY id_pedido DESC LIMIT 1
        `, [id_usuario]);
        return rows[0];
    },

    async addProductToOrder({ id_pedido, id_producto, cantidad }) {
        const [producto] = await pool.query(`
            SELECT precio_distribuidor_IVA 
            FROM producto 
            WHERE id_producto = ?`, [id_producto]);

        if (producto.length === 0) {
            throw new Error('Producto no encontrado');
        }

        const precio_unitario = producto[0].precio_distribuidor_IVA;

        const [result] = await pool.query(`
            INSERT INTO order_detail (id_pedido, id_producto, cantidad)
            VALUES (?, ?, ?)`,
            [id_pedido, id_producto, cantidad]
        );

        await pool.query(`
            UPDATE pedido
            SET total = (
                SELECT SUM(od.cantidad * p.precio_distribuidor_IVA)
                FROM order_detail od
                JOIN producto p ON p.id_producto = od.id_producto
                WHERE od.id_pedido = ?
            )
            WHERE id_pedido = ?
        `, [id_pedido, id_pedido]);

        return result.insertId;
    },

    async getProductsByOrder(id_pedido) {
        const [rows] = await pool.query(`
            SELECT od.id_producto, p.descripcion, od.cantidad, p.precio_distribuidor_IVA AS precio_unitario,
                   (od.cantidad * p.precio_distribuidor_IVA) AS total
            FROM order_detail od
            JOIN producto p ON p.id_producto = od.id_producto
            WHERE od.id_pedido = ?
        `, [id_pedido]);

        return rows;
    },

    async updateOrder(id_pedido, { estado, total, metodo_de_pago, fecha_entrega_estimada, direccion }) {
        const query = `
            UPDATE pedido
            SET estado = ?, total = ?, metodo_de_pago = ?, fecha_entrega_estimada = ?, direccion = ?
            WHERE id_pedido = ?`;

        const [result] = await pool.query(query, [estado, total, metodo_de_pago, fecha_entrega_estimada, direccion, id_pedido]);

        if (result.affectedRows === 0) {
            return null;
        }

        return {
            id_pedido,
            estado,
            total,
            metodo_de_pago,
            fecha_entrega_estimada,
            direccion
        };
    },

    async updateProductInOrder(id_pedido, id_producto, cantidad) {
        const [existingProduct] = await pool.query(`
            SELECT * FROM order_detail
            WHERE id_pedido = ? AND id_producto = ?`, [id_pedido, id_producto]);

        if (existingProduct.length > 0) {
            const [result] = await pool.query(`
                UPDATE order_detail 
                SET cantidad = ?
                WHERE id_pedido = ? AND id_producto = ?`, [cantidad, id_pedido, id_producto]);

            return result.affectedRows > 0;
        } else {
            const [result] = await pool.query(`
                INSERT INTO order_detail (id_pedido, id_producto, cantidad)
                VALUES (?, ?, ?)`, [id_pedido, id_producto, cantidad]);

            return result.insertId;
        }
    },

    async deleteOrder(id_pedido) {
        const query = `DELETE FROM pedido WHERE id_pedido = ?`;
        const [result] = await pool.query(query, [id_pedido]);

        if (result.affectedRows === 0) {
            return null;
        }

        return true;
    },

    async deleteProductFromOrder(id_pedido, id_producto) {
        const query = `DELETE FROM order_detail WHERE id_pedido = ? AND id_producto = ?`;
        const [result] = await pool.query(query, [id_pedido, id_producto]);

        if (result.affectedRows === 0) {
            return null;
        }

        await pool.query(`
            UPDATE pedido
            SET total = (
                SELECT SUM(od.cantidad * p.precio_distribuidor_IVA)
                FROM order_detail od
                JOIN producto p ON p.id_producto = od.id_producto
                WHERE od.id_pedido = ?
            )
            WHERE id_pedido = ?
        `, [id_pedido, id_pedido]);

        return true;
    }
};

module.exports = OrderModel;
