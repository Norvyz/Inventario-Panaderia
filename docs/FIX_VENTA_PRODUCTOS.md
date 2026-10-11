# Fix: Ventas fallaba por FK (productos vacíos)

## Problema
Al registrar venta, salía error 1452: FK `detalle_venta.id_producto` -> `productos.id`. La tabla `productos` estaba vacía.

## Solución aplicada
- Insertar productos demo en BD actual
- Actualizar `db/schema.sql` con productos demo para futuras instalaciones
- Venta ya funciona con IDs 1-4

## Productos demo
- PAN-001 Pan Francés $2500
- PAN-002 Mogolla $2000
- PAN-003 Rosca $3000
- PAN-004 Bollito $1500
