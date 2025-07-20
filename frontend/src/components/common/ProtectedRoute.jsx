"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0) {
    const userRole = user.type === "admin" ? "admin" : user.isDoctor ? "doctor" : "user"
    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard if user tries to access wrong role
      if (user.type === "admin") {
        return <Navigate to="/admin" replace />
      } else if (user.isDoctor) {
        return <Navigate to="/doctor" replace />
      } else {
        return <Navigate to="/user" replace />
      }
    }
  }

  return children
}

export default ProtectedRoute
