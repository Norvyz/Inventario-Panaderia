# Despliegue en Render + Supabase

Guía para publicar el proyecto gratis en [Render](https://render.com) usando
**Supabase** (PostgreSQL) como base de datos.

## Arquitectura final

```
Usuario
  │
  ├── Frontend React (Static Site en Render)     -> https://panaderia-frontend.onrender.com
  │
  └── Backend PHP + Apache (Docker en Render)    -> https://panaderia-backend.onrender.com
          │
          └── PostgreSQL (Supabase) -> se conecta con la variable DATABASE_URL
```

> **Importante:** la **única** base de datos del proyecto es **Supabase (PostgreSQL)**.
> Render solo hospeda el backend (PHP) y el frontend; **la base de datos NO vive en Render**.
> El backend se conecta a Supabase con la variable `DATABASE_URL`, igual en local y en producción.

---

## Paso 1 – Crear la base de datos en Supabase

1. Entra a https://supabase.com y crea un proyecto (plan Free).
2. Espera a que termine de crear la base.
3. Ve a **SQL Editor** → **New query**.
4. Pega y ejecuta todo el contenido de **`db/schema_supabase.sql`**.
   - Esto crea las tablas y los datos demo (admin + productos).
5. Verifica que aparezcan las tablas en **Table Editor**.

### Obtener la cadena de conexión
1. En Supabase ve a **Project Settings** → **Database**.
2. Busca **Connection string** → pestaña **URI**.
3. Copia algo parecido a:
   ```
   postgresql://postgres:TU_PASSWORD@db.xxxxxxxx.supabase.co:5432/postgres
   ```
4. Reemplaza `[YOUR-PASSWORD]` por la contraseña real de tu base.
5. Esa cadena es la que irá en la variable **`DATABASE_URL`**.

> **Si tu contraseña tiene caracteres raros** (`@`, `#`, `/`, etc.), usa el
> **Connection Pooler** de Supabase (botón "Connect" → "Pooler" → modo *Session*),
> o codifica la contraseña con "URL encode". El backend soporta el pooler sin problema.

---

## Paso 2 – Publicar el backend (PHP + Docker)

### Opción A – Con Blueprint (recomendado, usa `render.yaml`)

1. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "Soporte PostgreSQL (Supabase) para Render"
   git push
   ```
2. En Render: **New +** → **Blueprint** → conecta el repo.
3. Render creará los 2 servicios definidos en `render.yaml`.
4. Cuando pida el valor de `DATABASE_URL`, pega la cadena de Supabase.
5. Espera el deploy y prueba:
   ```
   https://panaderia-backend.onrender.com/health.php
   ```
   Debe responder `{"status":"ok",...}`

### Opción B – Manual (Web Service)

1. Render: **New +** → **Web Service** → conecta el repo.
2. Configura:
   - **Language:** Docker
   - **Root Directory:** `backend`
   - **Dockerfile Path:** `Dockerfile`
   - **Instance Type:** Free
   - **Health Check Path:** `/health.php`
3. En **Environment** agrega:
   ```
   DATABASE_URL = postgresql://postgres:TU_PASSWORD@db.xxxx.supabase.co:5432/postgres
   ```
4. Deploy.

> **Render Free:** el servicio "duerme" tras 15 min sin uso y tarda ~1 min en despertar.

---

## Paso 3 – Publicar el frontend (React)

1. Render: **New +** → **Static Site** → conecta el mismo repo.
2. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
3. En **Environment** agrega (con la URL real de tu backend + `/controllers`):
   ```
   VITE_API_URL=https://panaderia-backend.onrender.com/controllers
   ```
3. En **Redirects/Rewrites** agrega (para que funcione React Router):
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** Rewrite
4. Deploy. Abre la URL del frontend y prueba el login.

---

## Paso 4 – Verificación

- Login: `admin@panaderia.com` / `password`
- Dashboard con totales
- Crear insumo, registrar gasto, registrar venta

Si algo falla:
- Revisa los **Logs** del servicio en Render.
- Verifica que `DATABASE_URL` esté bien pegada (sin `[ ]`).
- Verifica que el backend responda `/health.php`.
- Prueba un endpoint directo:
  `https://panaderia-backend.onrender.com/controllers/dashboardController.php`

---

## Cómo funciona la conexión (resumen técnico)

`backend/config/db.php` se conecta siempre a **Supabase (PostgreSQL)**:

```php
$url = getenv('DATABASE_URL'); // en Render viene del panel de Environment
// local: se lee desde backend/.env
```

- DSN: `pgsql:host=...;port=5432;dbname=postgres;sslmode=require`
- Se usa `PDO::ATTR_EMULATE_PREPARES = true` para funcionar con el pooler de Supabase.
- Los `INSERT` que necesitan el id usan `backend/helpers/database.php`
  (`INSERT ... RETURNING id`).

---

## Archivos agregados para el despliegue

| Archivo | Para qué sirve |
|---|---|
| `backend/Dockerfile` | Render no corre PHP nativo; esto sí se lo permite (incluye pdo_pgsql) |
| `backend/.dockerignore` | Evita copiar `.env` y basura al contenedor |
| `backend/health.php` | Endpoint de salud para Render |
| `backend/.env.example` | Plantilla de `DATABASE_URL` para desarrollo local |
| `backend/config/db.php` | Lee `DATABASE_URL` (Supabase) |
| `backend/helpers/database.php` | `INSERT ... RETURNING id` (PostgreSQL) |
| `render.yaml` | Define los 2 servicios automáticamente |
| `db/schema_supabase.sql` | Script PostgreSQL para ejecutar en Supabase |
| `frontend/.env.example` | Plantilla de `VITE_API_URL` |
