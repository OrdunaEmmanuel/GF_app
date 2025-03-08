const { pool } = require("../CONFIGS/db.config"); // Importa el pool correctamente

const Cliente = {
    // Crear un nuevo cliente
    create: async (cliente) => {
        const { nombre, numero_celular, password, direccion, tipo_usuario } = cliente;
        const query = "INSERT INTO clientes (nombre, numero_celular, password, direccion, tipo_usuario) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.execute(query, [nombre, numero_celular, password, direccion, tipo_usuario || 'C']);
        return result.insertId;
    },

    // Buscar cliente por número de celular
    findByNumeroCelular: async (numero_celular) => {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE numero_celular = ?", [numero_celular]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Buscar cliente por ID
    findById: async (id) => {
        const [rows] = await pool.query("SELECT * FROM clientes WHERE id = ?", [id]);
        return rows.length > 0 ? rows[0] : null;
    },

    // Actualizar el token del cliente
    updateToken: async (id, token) => {
        await pool.query("UPDATE clientes SET token = ? WHERE id = ?", [token, id]);
    },

    // Obtener todos los clientes
    getAll: async () => {
        const [rows] = await pool.execute("SELECT * FROM clientes");
        return rows; // Devuelve todos los clientes
    },

    // Actualizar la información del cliente
    updateCliente: async (id, cliente) => {
        const { nombre, numero_celular, password, direccion, tipo_usuario } = cliente;
        const query = "UPDATE clientes SET nombre = ?, numero_celular = ?, password = ?, direccion = ?, tipo_usuario = ? WHERE id = ?";
        await pool.execute(query, [nombre, numero_celular, password, direccion, tipo_usuario, id]);
    },

    // Eliminar un cliente por ID
    deleteCliente: async (id) => {
        const query = "DELETE FROM clientes WHERE id = ?";
        await pool.execute(query, [id]);
    }
};

module.exports = Cliente;
