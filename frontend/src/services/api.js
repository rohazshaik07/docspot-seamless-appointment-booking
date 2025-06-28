import axios from "axios"
import toast from "react-hot-toast"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    const message = error.response?.data?.message || "Something went wrong"
    toast.error(message)

    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  signup: (userData) => api.post("/auth/signup", userData),
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (userData) => api.put("/auth/profile", userData),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
}

// Doctors API
export const doctorsAPI = {
  getAll: (params) => api.get("/doctors", { params }),
  getById: (id) => api.get(`/doctors/${id}`),
  getAvailableSlots: (id, date) => api.get(`/doctors/${id}/slots?date=${date}`),
  addReview: (id, reviewData) => api.post(`/doctors/${id}/reviews`, reviewData),
}

// Bookings API
export const bookingsAPI = {
  create: (bookingData) => api.post("/bookings", bookingData),
  getMyBookings: () => api.get("/bookings/my"),
  getById: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
  reschedule: (id, newDate, newTime) => api.put(`/bookings/${id}/reschedule`, { date: newDate, time: newTime }),
}

// Services API
export const servicesAPI = {
  getAll: () => api.get("/services"),
  getById: (id) => api.get(`/services/${id}`),
}

export default api
