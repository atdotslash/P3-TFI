const PDFDocument = require('pdfkit');

/**
 * Genera un PDF de informes usando la librería pdfkit
 * @param {Array} datos - Array con los datos del reporte de turnos
 * @param {Stream} stream - Objeto res de express para mandar el PDF directamente al cliente
 */
const generarReportePDF = (datos, res) => {
    const doc = new PDFDocument();
    
    // Configurar cabeceras de respuesta HTTP
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte_turnos.pdf');

    doc.pipe(res); // Enviamos el stream al cliente

    doc.fontSize(20).text('Reporte de Turnos', { align: 'center' });
    doc.moveDown();

    // Aquí iterarías sobre los 'datos' para crear tablas o listas con la información.
    doc.end();
};

module.exports = { generarReportePDF };