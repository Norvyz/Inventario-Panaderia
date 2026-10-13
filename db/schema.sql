-- ============================================================
--  OBSOLETO (MySQL/XAMPP)
--  Este archivo ya NO se usa. El proyecto ahora trabaja SOLO con
--  Supabase (PostgreSQL). El script vigente es: db/schema_supabase.sql
--  Se conserva únicamente como referencia histórica.
-- ============================================================

-- Base de datos: panaderia_inventario
CREATE DATABASE IF NOT EXISTS panaderia_inventario
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE panaderia_inventario;

-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  clave_hash VARCHAR(255) NOT NULL,
  id_rol INT NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_rol) REFERENCES roles(id)
);

-- 3. Categorías gasto
CREATE TABLE IF NOT EXISTS categorias_gasto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255)
);

-- 4. Insumos
CREATE TABLE IF NOT EXISTS insumos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  unidad_medida VARCHAR(20) NOT NULL, -- kg, gr, lt, ud
  stock_actual DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock_minimo DECIMAL(10,2) NOT NULL DEFAULT 5,
  precio_unitario DECIMAL(10,2) NOT NULL DEFAULT 0,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Productos (para venta)
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  precio_venta DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 6. Receta: producto -> insumo
CREATE TABLE IF NOT EXISTS receta_producto_insumo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_producto INT NOT NULL,
  id_insumo INT NOT NULL,
  cantidad_necesaria DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_insumo) REFERENCES insumos(id),
  UNIQUE KEY uk_receta (id_producto, id_insumo)
);

-- 7. Gastos
CREATE TABLE IF NOT EXISTS gastos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_categoria INT NOT NULL,
  descripcion VARCHAR(255),
  monto DECIMAL(10,2) NOT NULL,
  fecha_gasto DATE NOT NULL,
  id_usuario INT,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_categoria) REFERENCES categorias_gasto(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- 8. Ventas
CREATE TABLE IF NOT EXISTS ventas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  numero_venta VARCHAR(30) UNIQUE,
  id_usuario INT,
  fecha_venta DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10,2) NOT NULL,
  observacion VARCHAR(255),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- 9. Detalle venta
CREATE TABLE IF NOT EXISTS detalle_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES ventas(id) ON DELETE CASCADE,
  FOREIGN KEY (id_producto) REFERENCES productos(id)
);

-- 10. Movimientos inventario (entradas/salidas insumos)
CREATE TABLE IF NOT EXISTS movimientos_inventario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_insumo INT NOT NULL,
  tipo_movimiento ENUM('ENTRADA','SALIDA') NOT NULL,
  cantidad DECIMAL(10,2) NOT NULL,
  motivo VARCHAR(255),
  id_usuario INT,
  fecha_movimiento DATETIME DEFAULT CURRENT_TIMESTAMP,
  referencia VARCHAR(100),
  FOREIGN KEY (id_insumo) REFERENCES insumos(id),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Datos iniciales
INSERT IGNORE INTO roles (nombre) VALUES ('Administrador'), ('Cajero'), ('Almacén');
INSERT IGNORE INTO categorias_gasto (nombre) VALUES ('Arriendo'), ('Servicios'), ('Luz'), ('Agua'), ('Gas'), ('Transporte'), ('Otros');
INSERT IGNORE INTO usuarios (nombre, correo, clave_hash, id_rol) VALUES
('Admin Demo', 'admin@panaderia.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1); -- password: password

-- Productos demo para ventas
INSERT IGNORE INTO productos (codigo, nombre, precio_venta, activo) VALUES
('PAN-001', 'Pan Francés', 2500.00, 1),
('PAN-002', 'Mogolla', 2000.00, 1),
('PAN-003', 'Rosca', 3000.00, 1),
('PAN-004', 'Bollito', 1500.00, 1);
