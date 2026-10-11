# Instrucciones de Ejecución

## 1. Base de Datos (XAMPP)
1. Abrir XAMPP Control Panel
2. Iniciar MySQL y Apache
3. Ir a http://localhost/phpmyadmin
4. Importar `db/schema.sql` (seleccionar archivo y Ejecutar)
5. Se creará BD `panaderia_inventario` con datos demo

## 2. Backend PHP
Opción A: Copiar `backend/` a `C:\xampp\htdocs\panaderia\backend\`
- URL base API: `http://localhost/panaderia/backend/controllers/`

Opción B: Configurar VirtualHost (recomendado)

En `frontend/src/services/api.js` ajustar `API_URL` si cambias ruta.

## 3. Frontend React
```bash
cd frontend
npm install (ya hecho)
npm run dev
```
Abrir http://localhost:5173

## 4. Credenciales
admin@panaderia.com / password

## 5. Verificación rápida
- Login OK
- Dashboard muestra totales
- CRUD Insumos
- Registrar Gastos/Ventas

## Notas
- Conexión BD muy sencilla (`backend/config/db.php`) como pediste (estilo application.properties)
- Arquitectura por capas, modular, reutilizable
- Cumple todos los requisitos documentados
