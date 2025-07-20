"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import "./DoctorHome.css"

const DoctorHome = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    completedAppointments: 0,
    todayAppointments: 0,
    doctorInfo: null,
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDoctorStats()
    fetchRecentAppointments()
  }, [])

  const fetchDoctorStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/api/doctor/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setStats(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching doctor stats:", error)
      setLoading(false)
    }
  }

  const fetchRecentAppointments = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get("http://localhost:5000/api/doctor/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      setRecentAppointments(response.data.appointments.slice(0, 5)) // Get latest 5
    } catch (error) {
      console.error("Error fetching appointments:", error)
    }
  }

  if (loading) {
    return (
      <div className="doctor-home">
        <div className="doctor-header">
          <h1>Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="doctor-home">
      <div className="doctor-header">
        <h1>Doctor Dashboard</h1>
        <p>
          Welcome back, {stats.doctorInfo?.fullname || "Doctor"}! Specialization: {stats.doctorInfo?.specialization}
        </p>
      </div>

      <div className="doctor-stats">
        <div className="doctor-stat-card today">
          <div className="doctor-stat-number">{stats.todayAppointments}</div>
          <div className="doctor-stat-label">Today's Appointments</div>
        </div>
        <div className="doctor-stat-card pending">
          <div className="doctor-stat-number">{stats.pendingAppointments}</div>
          <div className="doctor-stat-label">Pending Requests</div>
        </div>
        <div className="doctor-stat-card completed">
          <div className="doctor-stat-number">{stats.completedAppointments}</div>
          <div className="doctor-stat-label">Completed</div>
        </div>
        <div className="doctor-stat-card total">
          <div className="doctor-stat-number">{stats.totalAppointments}</div>
          <div className="doctor-stat-label">Total Appointments</div>
        </div>
      </div>

      <div className="doctor-actions">
        <Link to="/doctor/appointments" className="doctor-action-btn">
          📅 Manage Appointments
        </Link>
        <Link to="/doctor/profile" className="doctor-action-btn">
          👨‍⚕️ Update Profile
        </Link>
        <Link to="/doctor/schedule" className="doctor-action-btn">
          🕒 View Schedule
        </Link>
        <Link to="/doctor/patients" className="doctor-action-btn">
          👥 Patient History
        </Link>
      </div>

      <div className="appointments-overview">
        <h3>Recent Appointments</h3>
        {recentAppointments.length > 0 ? (
          recentAppointments.map((appointment) => (
            <div key={appointment._id} className="appointment-item">
              <div className="appointment-info">
                <h4>{appointment.userInfo.name}</h4>
                <p>
                  {appointment.date} at {appointment.time}
                </p>
                <p>{appointment.notes || "No notes provided"}</p>
              </div>
              <div className={`appointment-status ${appointment.status}`}>{appointment.status}</div>
            </div>
          ))
        ) : (
          <div className="no-appointments">No recent appointments</div>
        )}
      </div>

      <div className="schedule-section">
        <h3>Your Schedule</h3>
        <div className="schedule-info">
          <div className="schedule-item">
            <h4>Working Hours</h4>
            <p>{stats.doctorInfo?.timings || "Not set"}</p>
          </div>
          <div className="schedule-item">
            <h4>Consultation Fee</h4>
            <p>${stats.doctorInfo?.fees || "Not set"}</p>
          </div>
          <div className="schedule-item">
            <h4>Experience</h4>
            <p>{stats.doctorInfo?.experience || "Not set"} years</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorHome
