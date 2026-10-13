# Panadería - Inventario Web

Sistema web para control de inventario, insumos, gastos, ventas y ganancias, con login por roles. Cumple requisitos del componente formativo.

## Tecnologías
- Frontend: React + Vite + Axios
- Backend: PHP 8+ (REST API, arquitectura por capas)
- Base de Datos: **Supabase (PostgreSQL)** — única base de datos del proyecto
- Despliegue: Render (backend PHP en Docker + frontend estático)
- Control versiones: Git

## Estructura
- `docs/`: Documentación (requisitos, casos de uso, diagramas, metodología, ambientes)
- `db/schema_supabase.sql`: Script de la base de datos (ejecutar en Supabase)
- `backend/`: API PHP (config, controllers, services, models, helpers)
- `frontend/`: App React

## Instalación rápida
1. Crear el proyecto en https://supabase.com
2. SQL Editor -> ejecutar `db/schema_supabase.sql`
3. Copiar `backend/.env.example` a `backend/.env` y pegar tu `DATABASE_URL` de Supabase
4. Backend: copiar carpeta `backend/` a `htdocs/` (o usar un servidor PHP)
4. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

> En XAMPP solo se usa **Apache + PHP** como servidor. La base de datos ya no es MySQL local.

## Credenciales demo
- admin@panaderia.com / password

## Conexión BD (sencilla)
Ver `backend/config/db.php`. Se configura con **una sola variable**: `DATABASE_URL`.

```php
// Producción (Render): variable de entorno DATABASE_URL
// Local: archivo backend/.env
// postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
```

> Para pruebas locales contra Supabase, habilita `extension=pdo_pgsql` en el `php.ini` de PHP (viene desactivada por defecto en XAMPP).

## Endpoints básicos
- POST /authController.php -> login
- GET/POST/PUT/DELETE /insumoController.php
- GET/POST /gastoController.php
- GET/POST /ventaController.php
- GET /dashboardController.php

## Documentación completa
Ver `docs/README_DOCS.md`

## Despliegue en Render + Supabase (gratis)
Ver guías completas en `docs/DESPLIEGUE_RENDER.md` y `docs/CONEXION_SUPABASE.md`.

Resumen:
- **Frontend**: Render Static Site (Root `frontend`, build `npm run build`, publish `dist`)
- **Backend**: Render Web Service con **Docker** (`backend/Dockerfile`), porque Render no corre PHP nativo
- **Base de datos**: **Supabase (PostgreSQL)**, la única. El script a ejecutar es `db/schema_supabase.sql`
- El backend siempre usa PostgreSQL (Supabase), tanto local como en producción
- Variable de entorno del backend: `DATABASE_URL` (cadena de conexión de Supabase)
- Variable del frontend: `VITE_API_URL=https://tu-backend.onrender.com/controllers`
- Incluye `render.yaml` para desplegar todo con un Blueprint
