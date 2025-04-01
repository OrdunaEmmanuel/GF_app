// services/crudService.js
const db = require('../CONFIG/database');

class CrudService {
  constructor(model) {
    this.model = model;
    this.tableName = model.tableName;
  }

  // Crear un nuevo registro
  async create(data) {
    try {
      const keys = Object.keys(data);
      const values = Object.values(data);
      const placeholders = keys.map(() => '?').join(',');
      
      const query = `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (${placeholders})`;
      
      const [result] = await db.execute(query, values);
      return {
        success: true,
        id: result.insertId,
        message: 'Registro creado exitosamente'
      };
    } catch (error) {
      console.error(`Error al crear registro en ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error al crear el registro',
        error: error.message
      };
    }
  }

  // Obtener todos los registros
  async findAll(conditions = {}, limit = 100, offset = 0) {
    try {
      let query = `SELECT * FROM ${this.tableName}`;
      const params = [];

      // Agregar condiciones WHERE si existen
      if (Object.keys(conditions).length > 0) {
        const whereClause = Object.keys(conditions)
          .map(key => `${key} = ?`)
          .join(' AND ');
        query += ` WHERE ${whereClause}`;
        params.push(...Object.values(conditions));
      }

      // Agregar límite y offset
      query += ` LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const [rows] = await db.execute(query, params);
      return {
        success: true,
        data: rows,
        message: 'Registros recuperados exitosamente'
      };
    } catch (error) {
      console.error(`Error al recuperar registros de ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error al recuperar registros',
        error: error.message
      };
    }
  }

  // Buscar por ID
  async findById(id) {
    try {
      const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
      const [rows] = await db.execute(query, [id]);

      if (rows.length === 0) {
        return {
          success: false,
          message: 'Registro no encontrado'
        };
      }

      return {
        success: true,
        data: rows[0],
        message: 'Registro encontrado'
      };
    } catch (error) {
      console.error(`Error al buscar registro en ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error al buscar el registro',
        error: error.message
      };
    }
  }

  // Actualizar registro
  async update(id, data) {
    try {
      const updateFields = Object.keys(data)
        .map(key => `${key} = ?`)
        .join(', ');
      const values = [...Object.values(data), id];

      const query = `UPDATE ${this.tableName} SET ${updateFields} WHERE id = ?`;
      
      const [result] = await db.execute(query, values);

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Registro no encontrado o sin cambios'
        };
      }

      return {
        success: true,
        message: 'Registro actualizado exitosamente'
      };
    } catch (error) {
      console.error(`Error al actualizar registro en ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error al actualizar el registro',
        error: error.message
      };
    }
  }

  // Eliminar registro
  async delete(id) {
    try {
      const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
      const [result] = await db.execute(query, [id]);

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: 'Registro no encontrado'
        };
      }

      return {
        success: true,
        message: 'Registro eliminado exitosamente'
      };
    } catch (error) {
      console.error(`Error al eliminar registro en ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error al eliminar el registro',
        error: error.message
      };
    }
  }

  // Búsqueda con filtros más avanzados
  async search(conditions, orderBy = 'id', order = 'ASC', limit = 100, offset = 0) {
    try {
      let query = `SELECT * FROM ${this.tableName}`;
      const params = [];

      // Agregar condiciones WHERE si existen
      if (Object.keys(conditions).length > 0) {
        const whereClause = Object.keys(conditions)
          .map(key => `${key} LIKE ?`)
          .join(' AND ');
        query += ` WHERE ${whereClause}`;
        params.push(...Object.values(conditions).map(val => `%${val}%`));
      }

      // Agregar ORDER BY
      query += ` ORDER BY ${orderBy} ${order}`;

      // Agregar límite y offset
      query += ` LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const [rows] = await db.execute(query, params);
      return {
        success: true,
        data: rows,
        message: 'Búsqueda realizada exitosamente'
      };
    } catch (error) {
      console.error(`Error en búsqueda de ${this.tableName}:`, error);
      return {
        success: false,
        message: 'Error en la búsqueda',
        error: error.message
      };
    }
  }
}

module.exports = CrudService;