import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [correo, setCorreo] = useState('admin@panaderia.com');
  const [clave, setClave] = useState('password');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await authAPI.login({ correo, clave });
      if (res.data.success) {
        login(res.data.data);
        navigate('/');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError('Error al conectar con servidor');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20 }}>
      <h2>Iniciar Sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Correo</label>
          <input value={correo} onChange={(e) => setCorreo(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Clave</label>
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} style={{ width: '100%', padding: 8 }} />
        </div>
        <button style={{ marginTop: 12, padding: '8px 16px' }}>Entrar</button>
      </form>
    </div>
  );
}
