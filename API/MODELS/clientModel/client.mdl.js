const { pool } = require("../../CONFIGS/db.config");

const Cliente = {create: async (cliente) => {
        const {
            nombre,
            apellido_p,
            apellido_m,
            clave,
            direccion,
            curp,
            numero_cel,
            password_user,
            tipo_usuario,
            token,
            id_localidad,
        } = cliente;

        const [result] = await pool.query(
            `INSERT INTO usuario 
            (nombre, apellido_p, apellido_m, clave, direccion, curp, numero_cel, password_user, tipo_usuario, id_localidad) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [nombre, apellido_p, apellido_m, clave, direccion, curp, numero_cel, password_user, tipo_usuario,token, id_localidad]
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
            `SELECT id_usuario, nombre, apellido_p, apellido_m, clave, direcion, curp, numero_cel, password_user, tipo_usuario, id_localidad FROM usuario`
        );
        return rows;
    },
};

module.exports = Cliente;
