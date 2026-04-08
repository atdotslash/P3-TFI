const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./docs/swagger.json'); // Descomentar cuando exista
require('dotenv').config();

const app = express();

// --- Middlewares Globales ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// --- Documentación Swagger ---
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- Rutas (Ejemplo de importación) ---
// const routesAdmin = require('./routes/adminRoutes');
// const routesTurnos = require('./routes/turnoRoutes');
// app.use('/api/admin', routesAdmin);
// app.use('/api/turnos', routesTurnos);

// --- Manejo de Errores Genérico ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ha ocurrido un error inesperado en el servidor.' });
});

// --- Inicialización del Servidor ---
const PORT = process.env.PORT || 3000;

// Exportamos app en caso de que necesites testearlo con Supertest, 
// de lo contrario arranca el servidor.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
}
module.exports = app;