import axios from 'axios'

const api = axios.create({
  baseURL: 'https://6a1aebbbbc2f94475492cebb.mockapi.io'
})

export default api