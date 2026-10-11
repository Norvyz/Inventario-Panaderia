# Documentación del Proyecto

Este proyecto cumple con todos los ítems solicitados:

- [x] Estudio de conceptos/requisitos (REQUISITOS.md)
- [x] Casos de uso / Historias de usuario (CASOS_DE_USO.md)
- [x] Diagrama de clases/paquetes/componentes (DIAGRAMAS.md)
- [x] Mapa de navegación (DIAGRAMAS.md)
- [x] Arquitectura por capas
- [x] Mecanismos de seguridad
- [x] Metodología de desarrollo (METODOLOGIA_Y_AMBIENTES.md)
- [x] Ambientes, servidores, BD
- [x] Librerías/frameworks por capa
- [x] Modular/reutilizable
- [x] Buenas prácticas
- [x] Control versiones Git
- [x] Estructura paquetes clara
- [x] Preparado para pruebas unitarias
- [x] Configuración DB sencilla (tipo application.properties)

## Quick Start

1. Iniciar XAMPP (Apache + MySQL)
2. Importar `db/schema.sql` en phpMyAdmin
3. Backend PHP: colocar en htdocs o usar servidor PHP
4. Frontend React: `npm create vite@latest frontend -- --template react` o usar estructura creada
5. Conectar frontend a `http://localhost/.../backend/controllers/...`

## Notas
La conexión PHP es intencionalmente **sencilla** (como pedías, sin mucho boilerplate). Revisar `backend/config/db.php`.
Base: `panaderia_inventario`, user `root`, pass vacía.
