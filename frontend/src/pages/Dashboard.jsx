import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [res, setRes] = useState(null);

  useEffect(() => {
    dashboardAPI.resumen().then(r => setRes(r.data.data)).catch(() => {});
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Panadería - Inventario</h2>
        <div>
          {user?.nombre} ({user?.rol}) 
          <button onClick={logout} style={{ marginLeft: 8 }}>Salir</button>
        </div>
      </header>
      <nav style={{ margin: '10px 0', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link to="/insumos">Insumos</Link>
        <Link to="/ventas">Ventas</Link>
        <Link to="/gastos">Gastos</Link>
        <Link to="/reportes">Reportes</Link>
      </nav>
      {res && (
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <div>Ventas: ${res.total_ventas.toFixed(2)}</div>
          <div>Gastos: ${res.total_gastos.toFixed(2)}</div>
          <div>Ganancias: ${res.ganancias.toFixed(2)}</div>
          <div>Stock bajo: {res.insumos_stock_bajo}</div>
        </div>
      )}
    </div>
  );
}
