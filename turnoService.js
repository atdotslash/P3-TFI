const pool = require('../config/db');

const crearTurno = async (id_medico, id_paciente, fecha_hora) => {
    const connection = await pool.getConnection();
    try {
        // 1. Iniciamos la transacción SQL
        await connection.beginTransaction();

        // 2. Obtener datos del médico y su valor de consulta
        const [medicos] = await connection.query(
            `SELECT valor_consulta FROM medicos WHERE id_medico = ? AND activo = 1 FOR UPDATE`, 
            [id_medico]
        );
        if (medicos.length === 0) throw new Error('Médico no encontrado o inactivo');
        const valor_consulta = parseFloat(medicos[0].valor_consulta);

        // 3. Obtener datos del paciente y su obra social
        const [pacientes] = await connection.query(
            `SELECT p.id_obra_social, os.porcentaje_descuento 
             FROM pacientes p 
             LEFT JOIN obras_sociales os ON p.id_obra_social = os.id_obra_social 
             WHERE p.id_paciente = ? AND p.activo = 1`, 
            [id_paciente]
        );
        if (pacientes.length === 0) throw new Error('Paciente no encontrado o inactivo');
        
        const porcentaje_descuento = pacientes[0].porcentaje_descuento ? parseFloat(pacientes[0].porcentaje_descuento) : 0;

        // 4. Regla de negocio: Cálculo del valor total
        // valor_total = medicos.valor_consulta - (obras_sociales.porcentaje_descuento * medicos.valor_consulta)
        const descuento_aplicado = porcentaje_descuento * valor_consulta;
        const valor_total = valor_consulta - descuento_aplicado;

        // 5. Insertar la reserva
        const [result] = await connection.query(
            `INSERT INTO turnos_reservas (id_medico, id_paciente, fecha_hora, valor_total) 
             VALUES (?, ?, ?, ?)`,
            [id_medico, id_paciente, fecha_hora, valor_total]
        );

        // 6. Confirmamos la transacción
        await connection.commit();
        return { id_turno: result.insertId, valor_total };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

module.exports = { crearTurno };