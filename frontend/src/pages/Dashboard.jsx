import { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import Layout from '../components/Layout';
import './Dashboard.css';

export default function Dashboard() {
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI
      .resumen()
      .then((r) => setRes(r.data.data))
      .catch(() => setRes(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Dashboard" subtitle="Visión general de ventas, gastos, ganancias y stock.">
      <section className="dashboard-grid">
        <article className="card stat-card">
          <span className="stat-label">Total Ventas</span>
          <span className="stat-value">${(res?.total_ventas || 0).toFixed(2)}</span>
          <span className="stat-sub">Suma de todas las ventas registradas</span>
        </article>
        <article className="card stat-card">
          <span className="stat-label">Total Gastos</span>
          <span className="stat-value">${(res?.total_gastos || 0).toFixed(2)}</span>
          <span className="stat-sub">Gastos registrados por categoría</span>
        </article>
        <article className="card stat-card">
          <span className="stat-label">Ganancias</span>
          <span className="stat-value">${(res?.ganancias || 0).toFixed(2)}</span>
          <span className="stat-sub">Ventas - Gastos</span>
        </article>
        <article className="card stat-card">
          <span className="stat-label">Insumos con stock bajo</span>
          <span className="stat-value">{res?.insumos_stock_bajo || 0}</span>
          <span className="stat-sub">Igual o menor al stock mínimo</span>
        </article>
      </section>
      <section className="card info-card">
        <h2>Accesos rápidos</h2>
        <p className="page-subtitle">Gestiona tu inventario desde las secciones del menú.</p>
      </section>
    </Layout>
  );
}
