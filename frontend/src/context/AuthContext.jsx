"use client"

import { createContext, useContext, useReducer, useEffect } from "react"
import { authAPI } from "../services/api"
import toast from "react-hot-toast"

const AuthContext = createContext()

const initialState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: true,
  error: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_USER":
      return { ...state, user: action.payload, loading: false, error: null }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      }
    case "LOGOUT":
      localStorage.removeItem("token")
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null,
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await authAPI.getProfile()
          dispatch({ type: "SET_USER", payload: response.data })
        } catch (error) {
          localStorage.removeItem("token")
          dispatch({ type: "LOGOUT" })
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    checkAuth()
  }, [])

  const login = async (credentials) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await authAPI.login(credentials)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
      toast.success("Login successful!")
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      dispatch({ type: "SET_ERROR", payload: message })
      toast.error(message)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true })
      const response = await authAPI.signup(userData)
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data })
      toast.success("Account created successfully!")
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed"
      dispatch({ type: "SET_ERROR", payload: message })
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" })
    toast.success("Logged out successfully!")
  }

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData)
      dispatch({ type: "UPDATE_USER", payload: response.data })
      toast.success("Profile updated successfully!")
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || "Update failed"
      toast.error(message)
      throw error
    }
  }

  const value = {
    ...state,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
