CREATE DATABASE IF NOT EXISTS clinica_tfi;
USE clinica_tfi;

CREATE TABLE obras_sociales (
    id_obra_social INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    porcentaje_descuento DECIMAL(5,2) DEFAULT 0.00, -- Ej: 0.20 para 20%
    activo TINYINT DEFAULT 1
);

CREATE TABLE especialidades (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    activo TINYINT DEFAULT 1
);

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    documento VARCHAR(20) UNIQUE NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    foto_path VARCHAR(255),
    rol TINYINT NOT NULL COMMENT '1=Paciente, 2=Médico, 3=Admin',
    activo TINYINT DEFAULT 1
);

CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_especialidad INT NOT NULL,
    matricula VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    valor_consulta DECIMAL(10,2) NOT NULL,
    activo TINYINT DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_especialidad) REFERENCES especialidades(id_especialidad)
);

CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_obra_social INT,
    activo TINYINT DEFAULT 1,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

CREATE TABLE medicos_obras_sociales (
    id_medico INT NOT NULL,
    id_obra_social INT NOT NULL,
    activo TINYINT DEFAULT 1,
    PRIMARY KEY (id_medico, id_obra_social),
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_obra_social) REFERENCES obras_sociales(id_obra_social)
);

CREATE TABLE turnos_reservas (
    id_turno_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    id_paciente INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    atendido TINYINT DEFAULT 0,
    activo TINYINT DEFAULT 1,
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente)
);

-- Stored Procedure para Estadísticas
DELIMITER //
CREATE PROCEDURE sp_estadisticas_atenciones(IN p_mes INT, IN p_anio INT)
BEGIN
    SELECT 
        m.id_medico,
        u.apellido,
        u.nombres,
        e.nombre AS especialidad,
        COUNT(tr.id_turno_reserva) AS total_turnos_atendidos,
        SUM(tr.valor_total) AS recaudacion_total
    FROM medicos m
    JOIN usuarios u ON m.id_usuario = u.id_usuario
    JOIN especialidades e ON m.id_especialidad = e.id_especialidad
    JOIN turnos_reservas tr ON m.id_medico = tr.id_medico
    WHERE tr.atendido = 1 
      AND tr.activo = 1 
      AND MONTH(tr.fecha_hora) = p_mes 
      AND YEAR(tr.fecha_hora) = p_anio
    GROUP BY m.id_medico;
END //
DELIMITER ;
