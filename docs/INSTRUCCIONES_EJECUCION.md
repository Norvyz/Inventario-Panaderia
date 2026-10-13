# Instrucciones de Ejecución

> **La única base de datos es Supabase (PostgreSQL).** No se usa MySQL ni XAMPP como base.

## 1. Base de datos (Supabase)
1. Crear un proyecto en https://supabase.com (plan Free).
2. Ir a **SQL Editor** -> **New query**.
3. Pegar y ejecutar `db/schema_supabase.sql`.
4. Ir a **Project Settings -> Database -> Connection string -> URI** y copiar la cadena:
   ```
   postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
   ```

## 2. Backend PHP
1. Copiar `backend/` a `C:\xampp\htdocs\panaderia\` (o donde sirvas PHP).
2. Crear el archivo `backend/.env` (NO se sube a Git) con:
   ```
   DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
   ```
3. Habilitar la extensión PostgreSQL en PHP (XAMPP la trae desactivada):
   - Abrir `C:\xampp\php\php.ini`
   - Buscar `;extension=pdo_pgsql` y `;extension=pgsql`
   - Quitar el `;` de ambas líneas y guardar
   - Reiniciar Apache

> Si solo vas a usar el sistema en la nube (Render), no necesitas nada de esto.

## 3. Frontend React
```bash
cd frontend
npm install
npm run dev
```
Abrir http://localhost:5173

La URL de la API se toma de `frontend/.env` (`VITE_API_URL`).
Si no existe, por defecto apunta a `http://localhost/panaderia/controllers`.

## 4. Credenciales
admin@panaderia.com / password

## 5. Verificación rápida
- Login OK
- Dashboard muestra totales
- CRUD Insumos
- Registrar Gastos / Ventas

## Notas
- Conexión BD por una sola variable: `DATABASE_URL`.
- Arquitectura por capas, modular y reutilizable.
