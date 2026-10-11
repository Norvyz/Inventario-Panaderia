import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Layout.css';

export default function Layout({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark"></span>
            <span className="brand-text">Panadería Inventario</span>
          </div>
          <nav className="topbar-nav">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Dashboard</NavLink>
            <NavLink to="/insumos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Insumos</NavLink>
            <NavLink to="/ventas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Ventas</NavLink>
            <NavLink to="/gastos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Gastos</NavLink>
            <NavLink to="/reportes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Reportes</NavLink>
          </nav>
          <div className="topbar-actions">
            <div className="user-info">
              <span className="user-name">{user?.nombre}</span>
              <span className="user-role">{user?.rol}</span>
            </div>
            <button className="secondary" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </header>
      <main className="layout-main">
        {(title || subtitle) && (
          <header className="page-header">
            {title && <h1>{title}</h1>}
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </header>
        )}
        {children}
      </main>
    </div>
  );
}
