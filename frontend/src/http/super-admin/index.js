import axios from 'axios'
const API_URL = import.meta.env.VITE_API_SUPER_ADMIN_URL

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'content-type': 'application/json',
  },
})

axiosClient.interceptors.request.use(async config => {
  const customHeaders = {
    Authorization: '',
  }

  const token = localStorage.getItem('super_admin_access_token')
  if (token) {
    customHeaders.Authorization = `Bearer ${token}`
  }

  return {
    ...config,
    headers: {
      ...customHeaders, // auto attach token
      ...config.headers, // but you can override for some requests
    },
  }
})

axiosClient.interceptors.response.use(
  response => {
    return response?.data
  },
  error => {    
    console.error(error.response, "interceptors Error")
    if (error.response.status === 401 && window.location.pathname !== `/super-admin/login`) {
      localStorage.removeItem('super_admin_access_token')
      window.location.href = '/super-admin/login'
    } else {
      throw error?.response?.data
    }
  },
)

export default axiosClient
