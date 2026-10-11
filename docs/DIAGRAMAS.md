# Diagramas del Sistema

## 1. Diagrama de Paquetes
```mermaid
packageDiagram
  class frontend {
    <<react>>
    pages/
    components/
    services/
    hooks/
    contexts/
    utils/
  }
  
  class backend {
    <<php>>
    config/
    controllers/
    services/
    models/
    helpers/
  }
  
  frontend --> backend : HTTP/REST
  backend --> db : PDO/MySQL
```

## 2. Diagrama de Clases (Simplificado)
```mermaid
classDiagram
  class Usuario {
    +id
    +nombre
    +correo
    +clave_hash
    +id_rol
    +activo
  }
  class Rol {
    +id
    +nombre
  }
  class Insumo {
    +id
    +codigo
    +nombre
    +unidad_medida
    +stock_actual
    +stock_minimo
  }
  class Producto {
    +id
    +nombre
    +precio_venta
    +activo
  }
  class RecetaProductoInsumo {
    +id_producto
    +id_insumo
    +cantidad_necesaria
  }
  class Venta {
    +id
    +total
    +fecha_venta
  }
  class DetalleVenta {
    +id_venta
    +id_producto
    +cantidad
    +subtotal
  }
  class Gasto {
    +id
    +monto
    +fecha_gasto
  }
  
  Usuario "1" --> "1" Rol
  Producto "1" --> "*" RecetaProductoInsumo
  Insumo "1" --> "*" RecetaProductoInsumo
  Venta "1" --> "*" DetalleVenta
  Producto "1" --> "*" DetalleVenta
```

## 3. Diagrama de Componentes
```mermaid
flowchart TD
  A[Frontend React] --> B[API REST PHP]
  B --> C[Controladores]
  C --> D[Servicios]
  D --> E[Modelos]
  E --> F[(MySQL XAMPP)]
```

## 4. Mapa de Navegación
```mermaid
flowchart LR
  Login --> Dashboard
  Dashboard --> Insumos
  Dashboard --> Productos
  Dashboard --> Recetas
  Dashboard --> Ventas
  Dashboard --> Gastos
  Dashboard --> Reportes
  Dashboard --> Usuarios
```

## 5. Arquitectura por Capas
- **Capa Presentación**: React (Vistas + Componentes)
- **Capa Negocio/Lógica**: PHP Services
- **Capa Datos**: PHP Models + PDO
- **Capa Configuración**: db.php
- **Persistencia**: MySQL

## 6. Seguridad (Mecanismos)
- Autenticación por sesiones PHP
- Hash de contraseñas (password_hash/password_verify)
- Validación servidor + cliente
- Prepared statements (PDO)
- Control por roles (middleware por ruta)
- CORS configurado (desarrollo)
