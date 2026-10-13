# Panadería - Inventario Web

Sistema web para control de inventario, insumos, gastos, ventas y ganancias, con login por roles. Cumple requisitos del componente formativo.

## Tecnologías
- Frontend: React + Vite + Axios
- Backend: PHP 8+ (REST API, arquitectura por capas)
- Base de Datos: MySQL (XAMPP)
- Control versiones: Git

## Estructura
- `docs/`: Documentación (requisitos, casos de uso, diagramas, metodología, ambientes)
- `db/`: Schema SQL
- `backend/`: API PHP (config, controllers, services, models, helpers)
- `frontend/`: App React

## Instalación rápida
1. XAMPP -> iniciar Apache + MySQL
2. phpMyAdmin -> importar `db/schema.sql` (crea `panaderia_inventario`)
3. Backend: copiar carpeta `backend/` a `htdocs/` (o configurar virtualhost)
4. Frontend: 
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Credenciales demo
- admin@panaderia.com / password (hash en schema)

## Conexión BD (sencilla)
Ver `backend/config/db.php` - equivalente a `application.properties` pero en PHP.
```php
define('DB_HOST','localhost');
define('DB_NAME','panaderia_inventario');
define('DB_USER','root');
define('DB_PASS','');
```

## Endpoints básicos
- POST /authController.php -> login
- GET/POST/PUT/DELETE /insumoController.php
- GET/POST /gastoController.php
- GET/POST /ventaController.php
- GET /dashboardController.php

## Documentación completa
Ver `docs/README_DOCS.md`

## Despliegue en Render (servidor gratis)
Ver guía completa en `docs/DESPLIEGUE_RENDER.md`.

Resumen:
- **Frontend**: Render Static Site (Root `frontend`, build `npm run build`, publish `dist`)
- **Backend**: Render Web Service con **Docker** (`backend/Dockerfile`), porque Render no corre PHP nativo
- **Base de datos**: Render NO da MySQL gratis → usar un MySQL gratuito externo (db4free.net, Aiven, TiDB). El script para la nube es `db/schema_render.sql`
- Variables de entorno del backend: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`
- Variable del frontend: `VITE_API_URL=https://tu-backend.onrender.com/controllers`
- Ya incluye `render.yaml` para desplegar todo con un Blueprint.
