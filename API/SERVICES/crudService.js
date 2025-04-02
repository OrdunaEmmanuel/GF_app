const { pool } = require('../CONFIGS/db.config');

// CREATE - Insertar un nuevo registro en la base de datos
exports.create = async (table, data) => {
    const keys = Object.keys(data).join(", ");
    const values = Object.values(data).map(value => `'${value}'`).join(", ");
    
    const query = `INSERT INTO ${table} (${keys}) VALUES (${values})`;

    try {
        const [result] = await pool.query(query);
        return result.insertId;  // Devuelve el ID del nuevo registro
    } catch (error) {
        throw new Error(`Error en la creación del registro: ${error.message}`);
    }
};

// READ - Obtener un registro por su ID
exports.findById = async (table, id) => {
    const query = `SELECT * FROM ${table} WHERE id_usuario = ?`;

    try {
        const [rows] = await pool.query(query, [id]);
        return rows.length ? rows[0] : null;  // Si no encuentra el registro, devuelve null
    } catch (error) {
        throw new Error(`Error al obtener el registro: ${error.message}`);
    }
};

// READ - Obtener todos los registros de una tabla
exports.findAll = async (table) => {
    const query = `SELECT * FROM ${table}`;

    try {
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        throw new Error(`Error al obtener los registros: ${error.message}`);
    }
};

// UPDATE - Actualizar un registro por su ID
exports.update = async (table, id, data) => {
    const setClause = Object.keys(data).map(key => `${key} = '${data[key]}'`).join(", ");
    const query = `UPDATE ${table} SET ${setClause} WHERE id_usuario = ?`;

    try {
        const [result] = await pool.query(query, [id]);
        return result.affectedRows;  // Devuelve el número de filas afectadas
    } catch (error) {
        throw new Error(`Error al actualizar el registro: ${error.message}`);
    }
};

// DELETE - Eliminar un registro por su ID
exports.delete = async (table, id) => {
    const query = `DELETE FROM ${table} WHERE id_usuario = ?`;

    try {
        const [result] = await pool.query(query, [id]);
        return result.affectedRows;  // Devuelve el número de filas afectadas
    } catch (error) {
        throw new Error(`Error al eliminar el registro: ${error.message}`);
    }
};
