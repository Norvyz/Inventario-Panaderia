import { useEffect, useState } from 'react';
import { insumoAPI } from '../services/api';

export default function Insumos() {
  const [insumos, setInsumos] = useState([]);
  const [form, setForm] = useState({ codigo:'', nombre:'', unidad_medida:'kg', stock_actual:0, stock_minimo:0, precio_unitario:0 });

  const cargar = () => insumoAPI.listar().then(r => setInsumos(r.data.data || []));

  useEffect(() => { cargar(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insumoAPI.crear(form);
    setForm({ codigo:'', nombre:'', unidad_medida:'kg', stock_actual:0, stock_minimo:0, precio_unitario:0 });
    cargar();
  };

  const eliminar = async (id) => {
    if (confirm('¿Eliminar?')) { await insumoAPI.eliminar(id); cargar(); }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Insumos</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
        <input placeholder="Código" value={form.codigo} onChange={e=>setForm({...form,codigo:e.target.value})} required />
        <input placeholder="Nombre" value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} required />
        <select value={form.unidad_medida} onChange={e=>setForm({...form,unidad_medida:e.target.value})}>
          <option value="kg">kg</option>
          <option value="gr">gr</option>
          <option value="lt">lt</option>
          <option value="ud">ud</option>
        </select>
        <input type="number" step="0.01" placeholder="Stock" value={form.stock_actual} onChange={e=>setForm({...form,stock_actual:e.target.value})} />
        <input type="number" step="0.01" placeholder="Mínimo" value={form.stock_minimo} onChange={e=>setForm({...form,stock_minimo:e.target.value})} />
        <input type="number" step="0.01" placeholder="Precio" value={form.precio_unitario} onChange={e=>setForm({...form,precio_unitario:e.target.value})} />
        <button>Agregar</button>
      </form>
      <table border="1" cellPadding="6" style={{ borderCollapse:'collapse' }}>
        <thead><tr><th>Cód</th><th>Nombre</th><th>Uni</th><th>Stock</th><th>Mín</th><th>Precio</th><th>Acciones</th></tr></thead>
        <tbody>
          {insumos.map(i=>(
            <tr key={i.id} style={i.stock_actual <= i.stock_minimo ? {background:'#ffe6e6'}:{}}>
              <td>{i.codigo}</td><td>{i.nombre}</td><td>{i.unidad_medida}</td><td>{i.stock_actual}</td><td>{i.stock_minimo}</td><td>${Number(i.precio_unitario).toFixed(2)}</td>
              <td><button onClick={()=>eliminar(i.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
