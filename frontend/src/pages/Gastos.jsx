import { useEffect, useState } from 'react';
import { gastoAPI } from '../services/api';
import Layout from '../components/Layout';
import './Gastos.css';

export default function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [form, setForm] = useState({
    id_categoria: 1,
    monto: 0,
    fecha_gasto: new Date().toISOString().split('T')[0],
    descripcion: '',
  });

  const cargar = async () => {
    const r = await gastoAPI.listar();
    setGastos(r.data.data || []);
  };

  useEffect(() => {
    cargar();
  }, []);

  const guardar = async (e) => {
    e.preventDefault();
    await gastoAPI.crear(form);
    cargar();
    setForm({ ...form, monto: 0, descripcion: '' });
  };

  return (
    <Layout
      title="Gastos"
      subtitle="Registra y consulta los gastos por categoría."
    >
      <section className="card">
        <h2>Registrar gasto</h2>
        <form onSubmit={guardar} className="gastos-form">
          <div className="field-group">
            <label className="field-label">Categoría</label>
            <select
              value={form.id_categoria}
              onChange={(e) =>
                setForm({ ...form, id_categoria: e.target.value })
              }
            >
              <option value="1">Arriendo</option>
              <option value="2">Servicios</option>
              <option value="3">Luz</option>
              <option value="4">Agua</option>
              <option value="5">Gas</option>
              <option value="6">Transporte</option>
              <option value="7">Otros</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Monto ($)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.monto}
              onChange={(e) => setForm({ ...form, monto: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label className="field-label">Fecha</label>
            <input
              type="date"
              value={form.fecha_gasto}
              onChange={(e) =>
                setForm({ ...form, fecha_gasto: e.target.value })
              }
            />
          </div>
          <div className="field-group descripcion-full">
            <label className="field-label">Descripción</label>
            <input
              placeholder="Detalle del gasto"
              value={form.descripcion}
              onChange={(e) =>
                setForm({ ...form, descripcion: e.target.value })
              }
            />
          </div>
          <div className="form-actions">
            <button type="submit">Registrar gasto</button>
          </div>
        </form>
      </section>

      <section className="card" style={{ overflowX: 'auto' }}>
        <h2>Historial de gastos</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Categoría</th>
              <th>Monto</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((g) => (
              <tr key={g.id}>
                <td>{g.fecha_gasto}</td>
                <td>{g.categoria}</td>
                <td>${Number(g.monto).toFixed(2)}</td>
                <td>{g.descripcion}</td>
              </tr>
            ))}
            {gastos.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center' }}>
                  No hay gastos registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </Layout>
  );
}
