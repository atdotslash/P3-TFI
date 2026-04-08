const db = require('../config/db');

/**
 * Clase Base para implementar reutilización de código y el Soft Delete obligatorio.
 */
class BaseModel {
    constructor(tableName, primaryKey) {
        this.tableName = tableName;
        this.primaryKey = primaryKey;
    }

    // Regla de Negocio: Todos los SELECT deben filtrar por activo = 1
    async findAll() {
        const [rows] = await db.query(`SELECT * FROM ${this.tableName} WHERE activo = 1`);
        return rows;
    }

    async findById(id) {
        const [rows] = await db.query(
            `SELECT * FROM ${this.tableName} WHERE ${this.primaryKey} = ? AND activo = 1`, 
            [id]
        );
        return rows[0];
    }

    // Regla de Negocio: Soft Delete
    async softDelete(id) {
        const [result] = await db.query(
            `UPDATE ${this.tableName} SET activo = 0 WHERE ${this.primaryKey} = ?`, 
            [id]
        );
        return result.affectedRows > 0;
    }
    
    // Los métodos create() y update() se implementarán en las clases hijas por su especificidad.
}

module.exports = BaseModel;