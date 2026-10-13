# Conexión con Supabase (PostgreSQL)

Supabase entrega una **cadena de conexión** (no usuario/clave por separado, aunque también sirve).

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

**Solo como variable de entorno** (nunca en el código ni en el repo):

- **Local (opcional):** crear `backend/.env` no aplica porque PHP no lo lee solo;
  para probar local con Supabase se puede definir la variable en el sistema.
- **Render:** en el servicio del backend, sección **Environment**:
  ```
  DATABASE_URL = postgresql://postgres:TU_PASSWORD@db.TU_PROYECTO.supabase.co:5432/postgres
  ```

## ¿Pooler o conexión directa?

| Conexión | Puerto | Cuándo usarla |
|---|---|---|
| Directa | `5432` | Simple, pocas conexiones |
| Pooler (Session) | `5432` (host `pooler.supabase.com`) | Recomendada si hay problemas de red/IPv6 |
| Pooler (Transaction) | `6543` | Muchas conexiones; el backend ya usa sentencias emuladas, así que funciona |

El backend ya está configurado con `PDO::ATTR_EMULATE_PREPARES = true` en PostgreSQL,
por lo que **funciona con las tres formas**.

## Seguridad

- La contraseña **nunca** debe subirse al repositorio.
- En el repo solo existe `backend/.env.example` como plantilla.
- En Render, `DATABASE_URL` se define con `sync: false` (no queda en `render.yaml`).
- Supabase tiene su propio control de acceso (RLS); para este caso el backend
  entra como `postgres`, que tiene acceso total.

## Nota sobre el plan Free de Supabase

Los proyectos Free se **pausan tras ~7 días sin actividad**. Para una práctica
suele ser suficiente; si se pausa, entra al panel de Supabase y reactívalo.
