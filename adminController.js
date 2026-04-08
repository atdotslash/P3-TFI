const db = require('../config/db');
const { validationResult } = require('express-validator');

/**
 * Asocia un médico con una obra social específica
 */
const asociarMedicoObraSocial = async (req, res) => {
    // Validación de express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_medico, id_obra_social } = req.body;

    try {
        // Aplicamos un INSERT con ON DUPLICATE KEY para manejar registros previamente borrados lógicamente
        const query = `
            INSERT INTO medicos_obras_sociales (id_medico, id_obra_social, activo) 
            VALUES (?, ?, 1)
            ON DUPLICATE KEY UPDATE activo = 1
        `;
        
        await db.query(query, [id_medico, id_obra_social]);
        
        res.status(201).json({ 
            message: 'Médico asociado a la obra social con éxito' 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno al asociar el médico y la obra social' });
    }
};

// Aquí también iría el CRUD de especialidades y la asignación del id_especialidad al perfil del médico.

module.exports = { asociarMedicoObraSocial };