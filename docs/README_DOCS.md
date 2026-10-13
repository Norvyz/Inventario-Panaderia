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

1. Crear proyecto en Supabase y ejecutar `db/schema_supabase.sql` en el SQL Editor
2. Crear `backend/.env` con `DATABASE_URL` (cadena de conexión de Supabase)
3. Backend PHP: colocar en htdocs o usar servidor PHP
4. Frontend React: `cd frontend && npm install && npm run dev`
5. Conectar frontend a la API con `VITE_API_URL`

## Notas
La conexión PHP es intencionalmente **sencilla** (sin mucho boilerplate). Revisar `backend/config/db.php`.
La **única** base de datos es **Supabase (PostgreSQL)**; se configura con la variable `DATABASE_URL`.
