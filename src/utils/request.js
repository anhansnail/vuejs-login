import axios from 'axios'
import router from '../router'
import VueCookies from 'vue-cookies'
const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type':'application/json'
  },
  withCredentials:false
})


api.interceptors.request.use(config => {
  const token = VueCookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
api.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    VueCookies.remove('token')
    router.push('/').catch(() => {})
  } else if (error.response.status === 403) {
    router.push('/').catch(() => {})
  }
  return Promise.reject(error)
})
export default {
  get (url, params) {
    return api.get(url, {params})
  },
  post (url, params) {
    return api.post(url, params)
  },
  put (url, params) {
    return api.put(url, params)
  },
  delete (url, params = null) {
    return api.delete(url, params)
  }
}
