"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap"
import { Calendar, Clock, MapPin, Phone, FileText } from "lucide-react"
import axios from "axios"
import { useNotification } from "../../context/NotificationContext"
import UserNavbar from "./UserNavbar"
import moment from "moment"

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const { addNotification } = useNotification()

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/appointments")
      setAppointments(response.data.appointments)
    } catch (error) {
      addNotification("Failed to fetch appointments", "error")
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.put(`http://localhost:5000/api/user/cancel-appointment/${appointmentId}`)
      addNotification("Appointment cancelled successfully", "success")
      fetchAppointments()
      setShowModal(false)
    } catch (error) {
      addNotification("Failed to cancel appointment", "error")
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      approved: "success",
      cancelled: "danger",
      completed: "info",
    }
    return <Badge bg={variants[status] || "secondary"}>{status.toUpperCase()}</Badge>
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: "#ffc107",
      approved: "#28a745",
      cancelled: "#dc3545",
      completed: "#17a2b8",
    }
    return colors[status] || "#6c757d"
  }

  if (loading) {
    return (
      <div>
        <UserNavbar />
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading appointments...</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <UserNavbar />
      <Container className="py-4">
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">My Appointments</h2>
            <p className="text-muted">Manage your healthcare appointments</p>
          </Col>
        </Row>

        {appointments.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <Calendar size={64} className="text-muted mb-3" />
              <h4>No Appointments Found</h4>
              <p className="text-muted">You haven't booked any appointments yet.</p>
              <Button variant="primary" href="/user">
                Book Your First Appointment
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {appointments.map((appointment) => (
              <Col md={6} lg={4} key={appointment._id} className="mb-4">
                <Card
                  className="appointment-card h-100"
                  style={{ borderLeftColor: getStatusColor(appointment.status) }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Card.Title className="h5">{appointment.doctorInfo.fullname}</Card.Title>
                        <Badge bg="secondary" className="mb-2">
                          {appointment.doctorInfo.specialization}
                        </Badge>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <Calendar size={16} className="me-2" />
                        <small>{moment(appointment.date).format("MMMM DD, YYYY")}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <Clock size={16} className="me-2" />
                        <small>{appointment.time}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <MapPin size={16} className="me-2" />
                        <small>{appointment.doctorInfo.address}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <Phone size={16} className="me-2" />
                        <small>{appointment.doctorInfo.phone}</small>
                      </div>
                      {appointment.document && (
                        <div className="d-flex align-items-center text-muted">
                          <FileText size={16} className="me-2" />
                          <small>Document attached</small>
                        </div>
                      )}
                    </div>

                    <div className="d-flex gap-2">
                      {appointment.status === "pending" && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setSelectedAppointment(appointment)
                            setShowModal(true)
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Cancel Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to cancel this appointment?</p>
            {selectedAppointment && (
              <div className="bg-light p-3 rounded">
                <strong>Doctor:</strong> {selectedAppointment.doctorInfo.fullname}
                <br />
                <strong>Date:</strong> {moment(selectedAppointment.date).format("MMMM DD, YYYY")}
                <br />
                <strong>Time:</strong> {selectedAppointment.time}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Keep Appointment
            </Button>
            <Button variant="danger" onClick={() => handleCancelAppointment(selectedAppointment._id)}>
              Cancel Appointment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default UserAppointments
