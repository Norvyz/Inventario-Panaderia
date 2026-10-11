import { useEffect, useState } from 'react';
import { insumoAPI } from '../services/api';
import Layout from '../components/Layout';
import './Insumos.css';

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    unidad_medida: 'kg',
    stock_actual: 0,
    stock_minimo: 0,
    precio_unitario: 0,
  });

  const cargar = async () => {
    try {
      setLoading(true);
      const r = await insumoAPI.listar();
      setInsumos(r.data.data || []);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insumoAPI.crear(form);
    setForm({
      codigo: '',
      nombre: '',
      unidad_medida: 'kg',
      stock_actual: 0,
      stock_minimo: 0,
      precio_unitario: 0,
    });
    cargar();
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar insumo?')) {
      await insumoAPI.eliminar(id);
      cargar();
    }
  };

  return (
    <Layout
      title="Insumos"
      subtitle="Control de materias primas, stock actual y stock mínimo."
    >
      <section className="card">
        <h2>Agregar insumo</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="field-group">
            <label className="field-label">Código</label>
            <input
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              required
              placeholder="INS-001"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Nombre</label>
            <input
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              required
              placeholder="Harina de trigo"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Unidad de medida</label>
            <select
              value={form.unidad_medida}
              onChange={(e) =>
                setForm({ ...form, unidad_medida: e.target.value })
              }
            >
              <option value="kg">Kilogramo (kg)</option>
              <option value="gr">Gramo (gr)</option>
              <option value="lt">Litro (lt)</option>
              <option value="ud">Unidad (ud)</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label">Stock actual</label>
            <input
              type="number"
              step="0.01"
              value={form.stock_actual}
              onChange={(e) =>
                setForm({ ...form, stock_actual: e.target.value })
              }
              min="0"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Stock mínimo</label>
            <input
              type="number"
              step="0.01"
              value={form.stock_minimo}
              onChange={(e) =>
                setForm({ ...form, stock_minimo: e.target.value })
              }
              min="0"
            />
          </div>
          <div className="field-group">
            <label className="field-label">Precio unitario</label>
            <input
              type="number"
              step="0.01"
              value={form.precio_unitario}
              onChange={(e) =>
                setForm({ ...form, precio_unitario: e.target.value })
              }
              min="0"
            />
          </div>
          <div className="form-actions">
            <button type="submit">Agregar insumo</button>
          </div>
        </form>
      </section>

      <section className="table-wrapper">
        <div className="card" style={{ overflowX: 'auto' }}>
          <h2>Listado de insumos</h2>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Unidad</th>
                <th>Stock actual</th>
                <th>Stock mínimo</th>
                <th>Precio unitario</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {insumos.map((i) => {
                const low =
                  Number(i.stock_actual) <= Number(i.stock_minimo);
                return (
                  <tr
                    key={i.id}
                    className={low ? 'stock-low' : 'stock-ok'}
                  >
                    <td>{i.codigo}</td>
                    <td>{i.nombre}</td>
                    <td>{i.unidad_medida}</td>
                    <td>{Number(i.stock_actual).toFixed(2)}</td>
                    <td>{Number(i.stock_minimo).toFixed(2)}</td>
                    <td>${Number(i.precio_unitario).toFixed(2)}</td>
                    <td>
                      {low ? (
                        <span className="badge danger">Stock bajo</span>
                      ) : (
                        <span className="badge">OK</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => eliminar(i.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
              {insumos.length === 0 && !loading && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center' }}>
                    No hay insumos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </Layout>
  );
}
