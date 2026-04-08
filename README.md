# Sistema de Gestión de Clínica Médica
## TFI Programación III

##👥 Grupo AI

| # | Nombre y Apellido |
|---|-------------------|
| 1 | Belardita Horacio Daniel |
| 2 | Berón Tomás Manuel |
| 3 | Leiva Enzo |
| 4 | Ortega Sergio |
| 5 | Sandoval Edgardo | 

## 📋 Descripción del Proyecto
Este proyecto es el **Trabajo Final Integrador** para la Tecnicatura Universitaria en Desarrollo Web (UNER). Consiste en una API REST robusta diseñada para gestionar el flujo de turnos, médicos y pacientes de una clínica, integrando seguridad mediante JWT, persistencia en MySQL y comunicación de reglas de negocio complejas.

## 🛠️ Tecnologías
**Entorno de Ejecución:** Node.js
**Framework:** Express.js
**Base de Datos:** MySQL con soporte para Transacciones y Stored Procedures
**Autenticación:** JSON Web Tokens (JWT) con autorización basada en roles (Admin, Médico, Paciente)
**Documentación:** Swagger
**Otras Librerías:** `express-validator` (validaciones), `morgan` (logs), `multer` (archivos), `dotenv` (variables de entorno)

## 🏗️ Estructura del Proyecto
```text
├── src/
│   ├── config/         # Configuración de DB y variables de entorno
│   ├── controllers/    # Lógica de manejo de peticiones
│   ├── middlewares/    # Auth, validación de roles y express-validator
│   ├── models/         # Definición de esquemas y lógica de persistencia
│   ├── routes/         # Definición de endpoints REST
│   ├── services/       # Lógica de negocio (cálculos, integración de SP)
│   ├── utils/          # Generación de PDF y helpers
│   └── app.js          # Punto de entrada de la aplicación
├── docs/               # Documentación Swagger
├── database/           # Scripts SQL y Stored Procedures
└── .env                # Variables sensibles

**Requisito:** Node.js versión 18 o superior.
Verificar con: `node --version`

## 📄 Licencia
Proyecto Académico - Programación III - TUDW - FCAD UNER - 2026
