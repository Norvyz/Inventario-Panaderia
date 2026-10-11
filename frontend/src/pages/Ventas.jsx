import { useEffect, useState } from 'react';
import { ventaAPI } from '../services/api';
import Layout from '../components/Layout';
import './Ventas.css';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [form, setForm] = useState({
    observacion: '',
    detalles: [{ id_producto: 1, cantidad: 1, precio_unitario: 0 }],
  });

  const cargar = async () => {
    const r = await ventaAPI.listar();
    setVentas(r.data.data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const agregarDetalle = () => {
    setForm({
      ...form,
      detalles: [
        ...form.detalles,
        { id_producto: 1, cantidad: 1, precio_unitario: 0 },
      ],
    });
  };

  const registrar = async (e) => {
    e.preventDefault();
    await ventaAPI.crear(form);
    cargar();
    setForm({
      observacion: '',
      detalles: [{ id_producto: 1, cantidad: 1, precio_unitario: 0 }],
    });
  };

  const totalVenta = form.detalles.reduce(
    (acc, d) => acc + Number(d.cantidad || 0) * Number(d.precio_unitario || 0),
    0
  );

  return (
    <Layout
      title="Ventas"
      subtitle="Registra ventas con detalle y consulta el historial."
    >
      <section className="card">
        <h2>Nueva venta</h2>
        <form onSubmit={registrar} className="detalle-list">
          {form.detalles.map((d, i) => (
            <div key={i} className="detalle-row">
              <div className="field-group">
                <label className="field-label">ID Producto</label>
                <input
                  type="number"
                  value={d.id_producto}
                  onChange={(e) => {
                    const det = [...form.detalles];
                    det[i].id_producto = e.target.value;
                    setForm({ ...form, detalles: det });
                  }}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Cantidad</label>
                <input
                  type="number"
                  min="1"
                  value={d.cantidad}
                  onChange={(e) => {
                    const det = [...form.detalles];
                    det[i].cantidad = e.target.value;
                    setForm({ ...form, detalles: det });
                  }}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Precio unitario ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={d.precio_unitario}
                  onChange={(e) => {
                    const det = [...form.detalles];
                    det[i].precio_unitario = e.target.value;
                    setForm({ ...form, detalles: det });
                  }}
                />
              </div>
              <div className="field-group">
                <label className="field-label">Subtotal</label>
                <input
                  type="number"
                  value={(d.cantidad * d.precio_unitario).toFixed(2)}
                  disabled
                />
              </div>
            </div>
          ))}
          <div className="detalle-actions">
            <button type="button" className="secondary" onClick={agregarDetalle}>
              + Agregar detalle
            </button>
            <div className="field-group observacion">
              <label className="field-label">Observación</label>
              <input
                placeholder="Cliente, forma de pago, etc."
                value={form.observacion}
                onChange={(e) =>
                  setForm({ ...form, observacion: e.target.value })
                }
              />
            </div>
            <div className="user-info">
              <span className="user-name">Total: ${totalVenta.toFixed(2)}</span>
            </div>
            <button type="submit">Registrar venta</button>
          </div>
        </form>
      </section>

      <section className="card" style={{ overflowX: 'auto' }}>
        <h2>Historial de ventas</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>N° Venta</th>
              <th>Total</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((v) => (
              <tr key={v.id}>
                <td>{v.fecha_venta}</td>
                <td>{v.numero_venta}</td>
                <td>${Number(v.total).toFixed(2)}</td>
                <td>{v.usuario}</td>
              </tr>
            ))}
            {ventas.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No hay ventas registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
