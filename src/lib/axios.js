import axios from "axios"

// Shared API client keeps the server URL and authentication behavior consistent.
const api = axios.create({ baseURL: "https://eventsphere-server-mfdb.onrender.com" })
api.interceptors.request.use(
  req => {
    // Attach the project API token to every outgoing HTTP request.
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
    return response.data
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)
export default api
