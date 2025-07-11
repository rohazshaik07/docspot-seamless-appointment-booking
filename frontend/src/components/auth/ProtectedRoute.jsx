"use client"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import LoadingSpinner from "../ui/LoadingSpinner"

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
