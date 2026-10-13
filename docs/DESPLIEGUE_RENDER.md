# Despliegue en Render

Esta guía deja el proyecto publicado gratis en [Render](https://render.com).

## Arquitectura final

```
Usuario
  │
  ├── Frontend React (Static Site en Render)     -> https://panaderia-frontend.onrender.com
  │
  └── Backend PHP + Apache (Docker en Render)    -> https://panaderia-backend.onrender.com
          │
          └── MySQL externo (Render no da MySQL gratis) -> proveedor gratuito
```

## ⚠️ Punto clave: la base de datos

**Render NO ofrece MySQL gratis.** Sus bases de datos gratis son **PostgreSQL** y además **expiran a los 30 días**.

Por lo tanto, para seguir usando MySQL (y no reescribir el proyecto) necesitas un **MySQL gratuito externo**. Opciones:

| Proveedor | Gratis | Notas |
|---|---|---|
| **db4free.net** | Sí | MySQL 8, rápido de crear, conexión directa. Ideal para prácticas |
| **freedb.tech** | Sí | MySQL, sin expiración |
| **Aiven** | Sí (plan free) | Requiere activar SSL (`DB_SSL=true`) |
| **TiDB Cloud Serverless** | Sí | Compatible MySQL, requiere SSL |

> **Alternativa:** si tu instructor acepta PostgreSQL, se puede migrar el proyecto a `pdo_pgsql` y usar la BD gratis de Render (pero expira en 30 días).

En esta guía usaremos **db4free.net** como ejemplo (es el más simple para practicar).

---

## Paso 1 – Crear la base de datos MySQL gratuita

1. Entra a https://www.db4free.net y crea una cuenta.
2. Anota los datos que te dan:
   - Host (ej: `db4free.net`)
   - Base de datos (ej: `panaderia_norvy`)
   - Usuario
   - Contraseña
   - Puerto: `3306`
3. Abre phpMyAdmin (te dan un enlace) o usa **MySQL Workbench** y conéctate con esos datos.
4. Ejecuta el script **`db/schema_render.sql`** (el que NO tiene `CREATE DATABASE`, porque el proveedor ya te dio la base).
5. Verifica: `SELECT * FROM usuarios;` debe mostrar el admin.

---

## Paso 2 – Publicar el backend (PHP + Docker)

### Opción A – Con Blueprint (recomendado, usa `render.yaml`)

1. Sube los cambios a GitHub:
   ```bash
   git add .
   git commit -m "Preparar despliegue en Render (Dockerfile, render.yaml, env vars)"
   git push
   ```
2. En Render: **New +** → **Blueprint**.
3. Conecta el repo `Norvyz/Inventario-para-una-panader-a-`.
4. Render leerá `render.yaml` y creará los 2 servicios.
5. Cuando pida las variables del backend, ingresa:
   ```
   DB_HOST=db4free.net
   DB_PORT=3306
   DB_NAME=tu_base
   DB_USER=tu_usuario
   DB_PASS=tu_contraseña
   ```
6. Espera el deploy. Prueba:
   ```
   https://panaderia-backend.onrender.com/health.php
   ```
   Debe responder `{"status":"ok",...}`

### Opción B – Manual (Web Service)

1. Render: **New +** → **Web Service**.
2. Conecta el repo.
3. Configura:
   - **Language:** Docker
   - **Root Directory:** `backend`
   - **Dockerfile Path:** `backend/Dockerfile` (o `Dockerfile` si el root es `backend`)
   - **Instance Type:** Free
   - **Health Check Path:** `/health.php`
4. En **Environment**, agrega `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`.
5. Deploy.

> **Nota Render Free:** el servicio "duerme" tras 15 min sin uso y tarda ~1 min en despertar en la primera petición.

---

## Paso 3 – Publicar el frontend (React)

1. Render: **New +** → **Static Site**.
2. Conecta el mismo repo.
3. Configura:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. En **Environment**, agrega:
   ```
   VITE_API_URL=https://panaderia-backend.onrender.com/controllers
   ```
   (usa la URL real de tu backend + `/controllers`)
5. En **Redirects/Rewrites**, agrega una regla para que funcione React Router:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** Rewrite
6. Deploy. Abre la URL del frontend y prueba el login.

---

## Paso 4 – Verificación

- Login: `admin@panaderia.com` / `password`
- Dashboard con totales
- Crear insumo, registrar gasto, registrar venta

Si algo falla:
- Revisa los **Logs** del servicio en Render.
- Verifica que `VITE_API_URL` termine en `/controllers`.
- Verifica que el backend responda `/health.php`.

---

## Resumen de archivos agregados para Render

| Archivo | Para qué sirve |
|---|---|
| `backend/Dockerfile` | Render no corre PHP nativo; esto sí se lo permite |
| `backend/.dockerignore` | Evita copiar `.env` y basura al contenedor |
| `backend/health.php` | Endpoint de salud para Render |
| `backend/config/db.php` | Ahora lee variables de entorno (local y nube) |
| `render.yaml` | Define los 2 servicios automáticamente |
| `db/schema_render.sql` | Script sin `CREATE DATABASE` para la nube |
| `frontend/.env.example` | Plantilla de `VITE_API_URL` |
