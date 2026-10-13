# Conexión con Supabase (PostgreSQL)

Supabase es la **única** base de datos del proyecto. Entrega una **cadena de conexión**.

## Formato

```
postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
```

| Parte | Ejemplo | Descripción |
|---|---|---|
| usuario | `postgres` | Usuario por defecto |
| contraseña | `TU_PASSWORD` | La que pusiste al crear el proyecto |
| host | `db.TU_PROYECTO.supabase.co` | Servidor de Supabase |
| puerto | `5432` | Puerto directo (o `6543` con el pooler) |
| base | `postgres` | Base por defecto |

## Cómo pasarla al backend

El backend lee **solo** la variable `DATABASE_URL`.

### En producción (Render)
En el servicio del backend, sección **Environment**:
```
DATABASE_URL = postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
```

### En local (opcional)
1. Copia `backend/.env.example` como `backend/.env`.
2. Pega tu cadena:
   ```
   DATABASE_URL=postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
   ```
3. Habilita la extensión PostgreSQL en el `php.ini` de XAMPP (viene desactivada):
   - Busca `;extension=pdo_pgsql` y `;extension=pgsql`
   - Quita el `;` de ambas y reinicia Apache

> `backend/.env` **no se sube a Git** (ya está en `.gitignore`).

## ¿Pooler o conexión directa?

| Conexión | Puerto | Cuándo usarla |
|---|---|---|
| Directa | `5432` | Simple, pocas conexiones |
| Pooler (Session) | `5432` (host `pooler.supabase.com`) | Si hay problemas de red/IPv6 |
| Pooler (Transaction) | `6543` | Muchas conexiones |

El backend usa `PDO::ATTR_EMULATE_PREPARES = true`, por lo que **funciona con las tres**.

## Seguridad

- La contraseña **nunca** se sube al repositorio.
- En el repo solo existe `backend/.env.example` como plantilla.
- En Render, `DATABASE_URL` se define con `sync: false` (no queda en `render.yaml`).

## Nota sobre el plan Free de Supabase

Los proyectos Free se **pausan tras ~7 días sin actividad**. Si se pausa, entra al
panel de Supabase y reactívalo.
