import axios from "axios"
const api = axios.create({ baseURL: "https://eventsphere-server-mfdb.onrender.com" })
api.interceptors.request.use(
  req => {
    req.headers.token = "secret-token"
    return req
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
api.interceptors.response.use(
  response => {
    return response.data.data
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
export default api
