import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

export default function Login() {
  const [correo, setCorreo] = useState('admin@panaderia.com');
  const [clave, setClave] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.login({ correo, clave });
      if (res.data.success) {
        login(res.data.data);
        navigate('/');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <header className="login-header">
          <span className="badge">Panadería - Inventario</span>
          <h1 className="login-title">Bienvenido de nuevo</h1>
          <p className="login-subtitle">Inicia sesión para gestionar insumos, ventas, gastos y ganancias.</p>
        </header>

        {error && <div className="alert">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="correo@panaderia.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="clave">Contraseña</label>
            <input
              id="clave"
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>

        <footer className="footer-note">
          Demo: admin@panaderia.com / password
        </footer>
      </div>
    </div>
  );
}
