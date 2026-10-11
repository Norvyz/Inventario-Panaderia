import { useEffect, useState } from 'react';
import { ventaAPI } from '../services/api';

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [form, setForm] = useState({ observacion:'', detalles:[{id_producto:1,cantidad:1,precio_unitario:0}] });

  const cargar = () => ventaAPI.listar().then(r=>setVentas(r.data.data||[]));
  useEffect(()=>{cargar();},[]);

  const agregarDetalle = () => setForm({...form, detalles:[...form.detalles,{id_producto:1,cantidad:1,precio_unitario:0}]});

  const registrar = async e=>{
    e.preventDefault();
    await ventaAPI.crear(form);
    cargar();
    setForm({observacion:'', detalles:[{id_producto:1,cantidad:1,precio_unitario:0}]});
  };

  return (
    <div style={{padding:20}}>
      <h3>Ventas</h3>
      <form onSubmit={registrar}>
        {form.detalles.map((d,i)=>(
          <div key={i} style={{display:'flex',gap:8,marginBottom:6}}>
            <input type="number" placeholder="Prod ID" value={d.id_producto} onChange={e=>{
              const det=[...form.detalles]; det[i].id_producto=e.target.value; setForm({...form,detalles:det});
            }} />
            <input type="number" placeholder="Cant" value={d.cantidad} onChange={e=>{
              const det=[...form.detalles]; det[i].cantidad=e.target.value; setForm({...form,detalles:det});
            }} />
            <input type="number" step="0.01" placeholder="Precio" value={d.precio_unitario} onChange={e=>{
              const det=[...form.detalles]; det[i].precio_unitario=e.target.value; setForm({...form,detalles:det});
            }} />
          </div>
        ))}
        <button type="button" onClick={agregarDetalle}>+ Detalle</button>
        <input placeholder="Observación" value={form.observacion} onChange={e=>setForm({...form,observacion:e.target.value})} style={{marginLeft:8}} />
        <button style={{marginLeft:8}}>Registrar Venta</button>
      </form>
      <h4 style={{marginTop:20}}>Historial</h4>
      <table border="1" cellPadding="6" style={{borderCollapse:'collapse'}}>
        <thead><tr><th>Fecha</th><th>N°</th><th>Total</th><th>Usuario</th></tr></thead>
        <tbody>{ventas.map(v=>(<tr key={v.id}><td>{v.fecha_venta}</td><td>{v.numero_venta}</td><td>${Number(v.total).toFixed(2)}</td><td>{v.usuario}</td></tr>))}</tbody>
      </table>
    </div>
  );
}
