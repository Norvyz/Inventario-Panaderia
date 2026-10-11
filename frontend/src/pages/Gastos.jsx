import { useEffect, useState } from 'react';
import { gastoAPI } from '../services/api';

export default function Gastos() {
  const [gastos, setGastos] = useState([]);
  const [form, setForm] = useState({ id_categoria:1, monto:0, fecha_gasto:new Date().toISOString().split('T')[0], descripcion:'' });

  const cargar = () => gastoAPI.listar().then(r=>setGastos(r.data.data||[]));
  useEffect(()=>{cargar();},[]);

  const guardar = async e=>{
    e.preventDefault();
    await gastoAPI.crear(form);
    cargar();
    setForm({...form,monto:0,descripcion:''});
  };

  return (
    <div style={{padding:20}}>
      <h3>Gastos</h3>
      <form onSubmit={guardar} style={{display:'flex',gap:8,flexWrap:'wrap',marginBottom:10}}>
        <select value={form.id_categoria} onChange={e=>setForm({...form,id_categoria:e.target.value})}>
          <option value="1">Arriendo</option><option value="2">Servicios</option><option value="3">Luz</option>
          <option value="4">Agua</option><option value="5">Gas</option><option value="6">Transporte</option><option value="7">Otros</option>
        </select>
        <input type="number" step="0.01" value={form.monto} onChange={e=>setForm({...form,monto:e.target.value})} />
        <input type="date" value={form.fecha_gasto} onChange={e=>setForm({...form,fecha_gasto:e.target.value})} />
        <input placeholder="Descripción" value={form.descripcion} onChange={e=>setForm({...form,descripcion:e.target.value})} style={{flex:1}} />
        <button>Registrar</button>
      </form>
      <table border="1" cellPadding="6" style={{borderCollapse:'collapse'}}>
        <thead><tr><th>Fecha</th><th>Categoría</th><th>Monto</th><th>Descripción</th></tr></thead>
        <tbody>{gastos.map(g=>(<tr key={g.id}><td>{g.fecha_gasto}</td><td>{g.categoria}</td><td>${Number(g.monto).toFixed(2)}</td><td>{g.descripcion}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
