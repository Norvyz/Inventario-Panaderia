import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Insumos from './pages/Insumos';
import Ventas from './pages/Ventas';
import Gastos from './pages/Gastos';
import Reportes from './pages/Reportes';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/insumos" element={<PrivateRoute><Insumos /></PrivateRoute>} />
      <Route path="/ventas" element={<PrivateRoute><Ventas /></PrivateRoute>} />
      <Route path="/gastos" element={<PrivateRoute><Gastos /></PrivateRoute>} />
      <Route path="/reportes" element={<PrivateRoute><Reportes /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
