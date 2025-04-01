// models/auth.mdl.js
const { pool } = require("../CONFIGS/db.config");

const Auth = {
  // Buscar usuario por número de celular (general para todos los tipos de usuarios)
  findByNumeroCelular: async (numero_celular, table = "clientes") => {
    const [rows] = await pool.query(
      `SELECT * FROM ${table} WHERE numero_celular = ?`,
      [numero_celular]
    );
    return rows.length > 0 ? rows[0] : null;
  },

  // Buscar usuario por ID (general para todos los tipos de usuarios)
  findById: async (id, table = "clientes") => {
    const [rows] = await pool.query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return rows.length > 0 ? rows[0] : null;
  },

  // Actualizar el token del usuario (general para todos los tipos de usuarios)
  updateToken: async (id, token, table = "clientes") => {
    await pool.query(`UPDATE ${table} SET token = ? WHERE id = ?`, [token, id]);
  },
};

module.exports = Auth;