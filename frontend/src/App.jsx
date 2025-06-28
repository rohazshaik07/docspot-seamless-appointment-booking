"use client"

import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./context/AuthContext"
import LoadingSpinner from "./components/ui/LoadingSpinner"
import ErrorBoundary from "./components/ui/ErrorBoundary"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import "./App.css"

// Lazy load components for better performance
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/Signup"))
const Doctors = lazy(() => import("./pages/Doctors"))
const DoctorDetails = lazy(() => import("./pages/DoctorDetails"))
const Services = lazy(() => import("./pages/Services"))
const About = lazy(() => import("./pages/About"))
const Contact = lazy(() => import("./pages/Contact"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const Profile = lazy(() => import("./pages/Profile"))
const Appointments = lazy(() => import("./pages/Appointments"))
const NotFound = lazy(() => import("./pages/NotFound"))

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
            <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
