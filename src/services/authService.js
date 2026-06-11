import api from './api'

export default {
  getAll: () => api.get('/usuarios'),
  findUser: async (usuario, password) => {
    const res = await api.get('/usuarios')
    return res.data.find(u => u.userName === usuario && u.password === password)
  }
}