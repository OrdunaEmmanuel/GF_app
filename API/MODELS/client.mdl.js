const { pool } = require("../CONFIGS/db.config");

const Cliente = {
    // Crear un nuevo cliente
    create: async (cliente) => {
        const {
            nombre,
            apellido_p,
            numero_celular,
            tipo_usuario,
            id_localidad,
        } = cliente;

        const [result] = await pool.query(
            `INSERT INTO usuario 
            (nombre, apellido_p, tipo_usuario, id_localidad) 
            VALUES (?, ?, 'cliente', ?)`,
            [nombre, apellido_p, id_localidad]
        );

        return result.insertId;
    },

    findByNumeroCelular: async (numero_celular) => {
        const [rows] = await pool.query(
            `SELECT * FROM usuario WHERE numero_cel = ?`,
            [numero_celular]
        );
        return rows.length ? rows[0] : null;
    },

    getAll: async () => {
        const [rows] = await pool.query(
            `SELECT id_usuario, nombre, apellido_p, apellido_m, numero_cel, direccion, tipo_usuario, id_localidad FROM usuario WHERE tipo_usuario='cliente'`
        );
        return rows;
    },
};

module.exports = Cliente;
