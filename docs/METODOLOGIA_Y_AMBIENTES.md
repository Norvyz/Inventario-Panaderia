# Metodología, Ambientes y Configuraciones

## 1. Metodología de desarrollo
Se recomienda enfoque modular, incremental. Se divide en componentes reutilizables, aplica principios SOLID, separación por capas y documentación continua. Git para control de versiones.

## 2. Control de versiones (Git)
- Repositorio: D:\Documento\PRUEBA (Git)
- Rama: main/master según convención
- Commits descriptivos
- .gitignore definido

## 3. Ambientes
### Desarrollo (Local)
- Servidor PHP: XAMPP (Apache + PHP) - http://localhost
- Base de Datos: MySQL (XAMPP) - localhost:3306
- Frontend: Vite/DevServer React (npm run dev) - http://localhost:5173
- IDE: VSCode

### Pruebas
- Base datos separada `panaderia_inventario_test` (opcional)
- Pruebas unitarias (PHPUnit recomendado / JS Vitest)
- Validaciones casos de uso

### Producción
- Servidor web + MySQL
- Compilar frontend (npm run build) -> servir estáticos

## 4. Librerías y Frameworks por capa
| Capa | Framework/Librería | Propósito |
|---|---|---|
| Frontend Presentación | React 18+ | UI |
| Frontend Ruteo/Estado | React Router, Context API | Navegación/estado |
| Frontend HTTP | Axios | Llamadas API |
| Frontend Build | Vite | Bundler |
| Backend | PHP 8+ | API REST |
| BD Acceso | PDO | Conexión segura |
| Utilidades | PHP nativo | Simple |
| Validación | Front+Back | Integridad |

## 5. Buenas prácticas aplicadas
- Código claro, nombres entendibles
- Modular, reutilizable
- Prepared statements
- Validación doble
- Manejo errores uniforme
- División por paquetes/carpetas (paquete lógico)
- Patrones: MVC-like + Service Layer + Repository (modelo por carpeta)
- Comentarios útiles

## 6. Configuración servidores y BD
- Apache: configurar DocumentRoot para backend o usar rutas relativas
- MySQL: ejecutar `db/schema.sql` en phpMyAdmin
- CORS: habilitado para desarrollo (ajustar en prod)
- Variables: constantes en db.php (ajustables)

## 7. Pruebas unitarias (recomendación)
- Backend: PHPUnit para Services/Helpers
- Frontend: Vitest + React Testing Library
- Casos críticos: login, ventas (descarga stock), movimientos
- Documentar resultados en `docs/PRUEBAS.md`
