const jwt = require('jsonwebtoken');

/**
 * Middleware para verificar la validez del JWT
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'Se requiere un token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Formato "Bearer <token>"
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ej: { id_usuario, rol }
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

/**
 * Middleware para validar roles
 * @param {Array<number>} allowedRoles - Ej: [1, 3] (Paciente y Admin)
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(401).json({ error: 'Usuario no autenticado correctamente' });
        }

        if (!allowedRoles.includes(req.user.rol)) {
            return res.status(403).json({ error: 'No tienes permisos para acceder a este recurso' });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    checkRole
};