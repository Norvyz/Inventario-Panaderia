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
