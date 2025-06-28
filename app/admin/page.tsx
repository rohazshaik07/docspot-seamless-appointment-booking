"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, Calendar, DollarSign, Activity } from "lucide-react"

interface Doctor {
  _id: string
  name: string
  email: string
  specialization: string
  isApproved: string
  createdAt: string
}

interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  isActive: boolean
}

interface Booking {
  _id: string
  doctor: any
  user: any
  appointmentDate: string
  appointmentTime: string
  status: string
  ticketPrice: number
}

export default function AdminPanel() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    pendingApprovals: 0,
    totalBookings: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    try {
      // Fetch doctors
      const doctorsRes = await fetch("/api/admin/doctors")
      const doctorsData = await doctorsRes.json()
      setDoctors(doctorsData.doctors || [])

      // Fetch users
      const usersRes = await fetch("/api/admin/users")
      const usersData = await usersRes.json()
      setUsers(usersData.users || [])

      // Fetch bookings
      const bookingsRes = await fetch("/api/admin/bookings")
      const bookingsData = await bookingsRes.json()
      setBookings(bookingsData.bookings || [])

      // Calculate stats
      const pendingDoctors = doctorsData.doctors?.filter((d: Doctor) => d.isApproved === "pending").length || 0
      const totalRevenue =
        bookingsData.bookings?.reduce((sum: number, booking: Booking) => sum + (booking.ticketPrice || 0), 0) || 0

      setStats({
        totalUsers: usersData.users?.length || 0,
        totalDoctors: doctorsData.doctors?.length || 0,
        pendingApprovals: pendingDoctors,
        totalBookings: bookingsData.bookings?.length || 0,
        totalRevenue,
      })
    } catch (error) {
      console.error("Error fetching admin data:", error)
    }
  }

  const handleDoctorApproval = async (doctorId: string, status: "approved" | "cancelled") => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}/approve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchAdminData() // Refresh data
      }
    } catch (error) {
      console.error("Error updating doctor status:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage DOCSPOT platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <UserCheck className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Doctors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalDoctors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingApprovals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="doctors" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="doctors">Doctor Management</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="bookings">Booking Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="doctors" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors
                    .filter((doctor) => doctor.isApproved === "pending")
                    .map((doctor) => (
                      <div key={doctor._id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-gray-600">{doctor.email}</p>
                          <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleDoctorApproval(doctor._id, "approved")}>
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDoctorApproval(doctor._id, "cancelled")}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  {doctors.filter((doctor) => doctor.isApproved === "pending").length === 0 && (
                    <p className="text-gray-500 text-center py-8">No pending doctor approvals</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Doctors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div key={doctor._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">{doctor.email}</p>
                        <p className="text-sm text-gray-500">{doctor.specialization}</p>
                      </div>
                      <Badge
                        variant={
                          doctor.isApproved === "approved"
                            ? "default"
                            : doctor.isApproved === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {doctor.isApproved}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">Role: {user.role}</p>
                      </div>
                      <Badge variant={user.isActive ? "default" : "secondary"}>
                        {user.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">
                          {booking.user?.name} → {booking.doctor?.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.appointmentDate).toLocaleDateString()} at {booking.appointmentTime}
                        </p>
                        <p className="text-sm text-gray-500">${booking.ticketPrice}</p>
                      </div>
                      <Badge
                        variant={
                          booking.status === "completed"
                            ? "default"
                            : booking.status === "approved"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-semibold">${stats.totalRevenue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Users</span>
                      <span className="font-semibold">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Approved Doctors</span>
                      <span className="font-semibold">{doctors.filter((d) => d.isApproved === "approved").length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed Appointments</span>
                      <span className="font-semibold">{bookings.filter((b) => b.status === "completed").length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">
                      • {doctors.filter((d) => d.isApproved === "pending").length} doctors awaiting approval
                    </p>
                    <p className="text-sm text-gray-600">
                      • {bookings.filter((b) => b.status === "pending").length} pending appointments
                    </p>
                    <p className="text-sm text-gray-600">• {users.filter((u) => u.isActive).length} active users</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
