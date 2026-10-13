import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/panaderia/controllers';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
export const authAPI = {
  login: (data) => api.post('/authController.php', data)
};
export const insumoAPI = {
  listar: () => api.get('/insumoController.php'),
  crear: (data) => api.post('/insumoController.php', data),
  actualizar: (id, data) => api.put(`/insumoController.php/${id}`, data),
  eliminar: (id) => api.delete(`/insumoController.php/${id}`)
};
export const gastoAPI = {
  listar: () => api.get('/gastoController.php'),
  crear: (data) => api.post('/gastoController.php', data)
};
export const ventaAPI = {
  listar: () => api.get('/ventaController.php'),
  crear: (data) => api.post('/ventaController.php', data)
};
export const dashboardAPI = {
  resumen: () => api.get('/dashboardController.php')
};
