# Requisitos del Sistema - Inventario Panadería

## 1. Objetivo general
Desarrollar un sistema web para el control de inventario, insumos, gastos, ventas y ganancias de una panadería, con inicio de sesión, roles y reportes, cumpliendo los requisitos del componente formativo.

## 2. Objetivos específicos
- Controlar insumos y stock mínimo
- Registrar gastos por categoría
- Registrar ventas y calcular ganancias
- Controlar accesos por roles
- Generar reportes básicos
- Mantener trazabilidad de movimientos

## 3. Requerimientos funcionales
- RF01: Iniciar sesión (autenticación)
- RF02: Cerrar sesión
- RF03: Gestión de usuarios y roles (Admin)
- RF04: Gestión de insumos (CRUD)
- RF05: Gestión de productos (ventas)
- RF06: Recetas (insumo x producto)
- RF07: Registro de gastos
- RF08: Registro de ventas (con detalle)
- RF09: Consultas y reportes
- RF10: Alertas de stock bajo

## 4. Requerimientos no funcionales
- RNF01: Tecnologías: React, HTML, JS, PHP, PostgreSQL (Supabase)
- RNF02: Arquitectura por capas
- RNF03: Conexión sencilla a BD
- RNF04: Código claro y comentado siguiendo buenas prácticas
- RNF05: Validaciones en frontend y backend
- RNF06: Control de versiones con Git
- RNF07: Seguridad básica (sesiones PHP + validación)
- RNF08: Estructura modular reutilizable

## 5. Roles
- Administrador: todo
- Cajero: registrar ventas
- Almacén: insumos, movimientos
