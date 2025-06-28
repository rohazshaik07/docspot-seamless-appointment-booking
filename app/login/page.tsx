"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, User, Shield, Stethoscope } from "lucide-react"
import { Header } from "@/components/header"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const demoCredentials = [
    {
      role: "Admin",
      email: "admin@docspot.com",
      password: "admin123",
      icon: Shield,
      color: "text-red-600",
    },
    {
      role: "Patient",
      email: "john.doe@example.com",
      password: "password123",
      icon: User,
      color: "text-blue-600",
    },
    {
      role: "Doctor",
      email: "dr.ahmed@docspot.com",
      password: "doctor123",
      icon: Stethoscope,
      color: "text-green-600",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)

        // Redirect based on user role
        if (data.user.role === "admin") {
          window.location.href = "/admin"
        } else if (data.user.role === "doctor") {
          window.location.href = "/doctor-dashboard"
        } else {
          window.location.href = "/dashboard"
        }
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error("Login error:", error)
      alert("Login failed. Please try again.")
    }
  }

  const handleDemoLogin = (email: string, password: string) => {
    setFormData({ email, password })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <Card className="w-full">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </form>

              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Demo Credentials */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">Demo Credentials</CardTitle>
              <CardDescription className="text-center">
                Click on any credential below to auto-fill the login form
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {demoCredentials.map((cred, index) => {
                const IconComponent = cred.icon
                return (
                  <div
                    key={index}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleDemoLogin(cred.email, cred.password)}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`h-6 w-6 ${cred.color}`} />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{cred.role} Login</div>
                        <div className="text-sm text-gray-600">{cred.email}</div>
                        <div className="text-sm text-gray-500">Password: {cred.password}</div>
                      </div>
                    </div>
                  </div>
                )
              })}

              <Separator className="my-4" />

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">More Doctor Accounts:</h4>
                <div className="text-sm space-y-1">
                  <div className="text-gray-600">dr.mahmud@docspot.com / doctor123</div>
                  <div className="text-gray-600">dr.farid@docspot.com / doctor123</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-gray-900">More Patient Accounts:</h4>
                <div className="text-sm space-y-1">
                  <div className="text-gray-600">sarah.smith@example.com / password123</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
