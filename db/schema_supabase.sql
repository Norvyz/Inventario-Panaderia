-- ============================================================
--  Script para SUPABASE (PostgreSQL)
--  Cómo usarlo:
--   1. Entra a tu proyecto en https://supabase.com
--   2. Ve a "SQL Editor" -> "New query"
--   3. Pega TODO este script y presiona "Run"
-- ============================================================

-- 1. Roles
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL UNIQUE
);

-- 2. Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(100) NOT NULL UNIQUE,
  clave_hash VARCHAR(255) NOT NULL,
  id_rol INTEGER NOT NULL REFERENCES roles(id),
  activo SMALLINT DEFAULT 1,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categorías gasto
CREATE TABLE IF NOT EXISTS categorias_gasto (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion VARCHAR(255)
);

-- 4. Insumos
CREATE TABLE IF NOT EXISTS insumos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  unidad_medida VARCHAR(20) NOT NULL,
  stock_actual NUMERIC(10,2) NOT NULL DEFAULT 0,
  stock_minimo NUMERIC(10,2) NOT NULL DEFAULT 5,
  precio_unitario NUMERIC(10,2) NOT NULL DEFAULT 0,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Productos
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(50) UNIQUE,
  nombre VARCHAR(150) NOT NULL,
  precio_venta NUMERIC(10,2) NOT NULL,
  activo SMALLINT DEFAULT 1,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Receta
CREATE TABLE IF NOT EXISTS receta_producto_insumo (
  id SERIAL PRIMARY KEY,
  id_producto INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  id_insumo INT NOT NULL REFERENCES insumos(id),
  cantidad_necesaria NUMERIC(10,2) NOT NULL,
  CONSTRAINT uk_receta UNIQUE (id_producto, id_insumo)
);

-- 7. Gastos
CREATE TABLE IF NOT EXISTS gastos (
  id SERIAL PRIMARY KEY,
  id_categoria INT NOT NULL REFERENCES categorias_gasto(id),
  descripcion VARCHAR(255),
  monto NUMERIC(10,2) NOT NULL,
  fecha_gasto DATE NOT NULL,
  id_usuario INT REFERENCES usuarios(id),
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Ventas
CREATE TABLE IF NOT EXISTS ventas (
  id SERIAL PRIMARY KEY,
  numero_venta VARCHAR(30) UNIQUE,
  id_usuario INT REFERENCES usuarios(id),
  fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total NUMERIC(10,2) NOT NULL,
  observacion VARCHAR(255)
);

-- 9. Detalle venta
CREATE TABLE IF NOT EXISTS detalle_venta (
  id SERIAL PRIMARY KEY,
  id_venta INT NOT NULL REFERENCES ventas(id) ON DELETE CASCADE,
  id_producto INT NOT NULL REFERENCES productos(id),
  cantidad INT NOT NULL,
  precio_unitario NUMERIC(10,2) NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL
);

-- 10. Movimientos de inventario
CREATE TABLE IF NOT EXISTS movimientos_inventario (
  id SERIAL PRIMARY KEY,
  id_insumo INT NOT NULL REFERENCES insumos(id),
  tipo_movimiento VARCHAR(10) NOT NULL CHECK (tipo_movimiento IN ('ENTRADA','SALIDA')),
  cantidad NUMERIC(10,2) NOT NULL,
  motivo VARCHAR(255),
  id_usuario INT REFERENCES usuarios(id),
  fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  referencia VARCHAR(100)
);

-- ============================================================
--  Datos iniciales
-- ============================================================
INSERT INTO roles (nombre) VALUES ('Administrador'), ('Cajero'), ('Almacén')
  ON CONFLICT (nombre) DO NOTHING;

INSERT INTO categorias_gasto (nombre) VALUES
  ('Arriendo'), ('Servicios'), ('Luz'), ('Agua'), ('Gas'), ('Transporte'), ('Otros')
  ON CONFLICT (nombre) DO NOTHING;

-- Usuario demo -> admin@panaderia.com / password
INSERT INTO usuarios (nombre, correo, clave_hash, id_rol)
VALUES ('Admin Demo', 'admin@panaderia.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1)
ON CONFLICT (correo) DO NOTHING;

INSERT INTO productos (codigo, nombre, precio_venta, activo) VALUES
  ('PAN-001', 'Pan Francés', 2500.00, 1),
  ('PAN-002', 'Mogolla', 2000.00, 1),
  ('PAN-003', 'Rosca', 3000.00, 1),
  ('PAN-004', 'Bollito', 1500.00, 1)
ON CONFLICT (codigo) DO NOTHING;

-- Verificación
SELECT 'roles' AS tabla, COUNT(*) FROM roles
UNION ALL SELECT 'usuarios', COUNT(*) FROM usuarios
UNION ALL SELECT 'productos', COUNT(*) FROM productos;
