import api from './api'

export default {
  getAll: () => api.get('/Productos'),
  create: (data) => api.post('/Productos', data),
  update: (id, data) => api.put(`/Productos/${id}`, data),
  delete: (id) => api.delete(`/Productos/${id}`)
}