import Layout from '../components/Layout';
import './Reportes.css';

export default function Reportes() {
  return (
    <Layout
      title="Reportes"
      subtitle="Consolida información clave para tomar decisiones."
    >
      <section className="reports-grid">
        <article className="card">
          <h2>Ventas</h2>
          <p className="page-subtitle">
            Filtrar por fecha, total por periodo y detalle por productos.
          </p>
        </article>
        <article className="card">
          <h2>Gastos</h2>
          <p className="page-subtitle">
            Agrupados por categoría, acumulado mensual/semanal.
          </p>
        </article>
        <article className="card">
          <h2>Ganancias</h2>
          <p className="page-subtitle">
            (Ventas - Gastos) con comparativos entre periodos.
          </p>
        </article>
        <article className="card">
          <h2>Stock bajo</h2>
          <p className="page-subtitle">
            Listado de insumos con alerta para reabastecer.
          </p>
        </article>
      </section>
    </Layout>
  );
}
