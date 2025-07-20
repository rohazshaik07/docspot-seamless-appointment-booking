"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from "react-bootstrap"
import { Calendar, Clock, FileText, User, MapPin, Phone, Star } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext"
import UserNavbar from "./UserNavbar"
import moment from "moment"

const BookAppointment = () => {
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    document: null,
    notes: "",
  })
  const [error, setError] = useState("")

  const { user } = useAuth()
  const { addNotification } = useNotification()

  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ]

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const doctorId = urlParams.get("doctorId")

        if (!doctorId) {
          addNotification("Doctor not found", "error")
          window.location.href = "/user"
          return
        }

        const response = await axios.get("http://localhost:5000/api/user/doctors")
        const doctors = response.data.doctors || []
        const selectedDoctor = doctors.find((d) => d._id === doctorId)

        if (selectedDoctor) {
          setDoctor(selectedDoctor)
        } else {
          addNotification("Doctor not found", "error")
          window.location.href = "/user"
        }
      } catch (error) {
        addNotification("Failed to fetch doctor details", "error")
        window.location.href = "/user"
      } finally {
        setLoading(false)
      }
    }

    fetchDoctor()
  }, [addNotification])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSubmitting(true)

    try {
      const appointmentData = {
        doctorId: doctor._id,
        date: formData.date,
        time: formData.time,
        document: formData.document?.name || "",
        notes: formData.notes,
      }

      await axios.post("http://localhost:5000/api/user/book-appointment", appointmentData)
      setShowConfirmation(true)
      addNotification("Appointment booked successfully!", "success")
    } catch (error) {
      setError(error.response?.data?.message || "Failed to book appointment")
      addNotification("Failed to book appointment", "error")
    } finally {
      setSubmitting(false)
    }
  }

  const getMinDate = () => {
    return moment().format("YYYY-MM-DD")
  }

  const getMaxDate = () => {
    return moment().add(30, "days").format("YYYY-MM-DD")
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
            <p className="mt-3">Loading doctor details...</p>
          </div>
        </Container>
      </div>
    )
  }

  if (!doctor) {
    return (
      <div>
        <UserNavbar />
        <Container className="py-5">
          <Alert variant="danger">Doctor not found</Alert>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <UserNavbar />
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col lg={8}>
            {/* Doctor Information Card */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-primary text-white">
                <h4 className="mb-0">
                  <User className="me-2" size={20} />
                  Book Appointment with {doctor.fullname}
                </h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h5 className="text-primary">{doctor.fullname}</h5>
                    <p className="text-muted mb-2">{doctor.specialization}</p>
                    <div className="mb-2">
                      <Star size={16} className="text-warning me-1" />
                      <small>{doctor.experience} years experience</small>
                    </div>
                    <div className="mb-2">
                      <MapPin size={16} className="text-muted me-1" />
                      <small>{doctor.address}</small>
                    </div>
                    <div className="mb-2">
                      <Phone size={16} className="text-muted me-1" />
                      <small>{doctor.phone}</small>
                    </div>
                    <div className="mb-2">
                      <Clock size={16} className="text-muted me-1" />
                      <small>Available: {doctor.timings}</small>
                    </div>
                  </Col>
                  <Col md={4} className="text-end">
                    <div className="consultation-fee">
                      <h3 className="text-success mb-0">${doctor.fees}</h3>
                      <small className="text-muted">Consultation Fee</small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Appointment Booking Form */}
            <Card className="shadow-sm">
              <Card.Header>
                <h5 className="mb-0">
                  <Calendar className="me-2" size={20} />
                  Schedule Your Appointment
                </h5>
              </Card.Header>
              <Card.Body>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <Calendar size={16} className="me-1" />
                          Preferred Date
                        </Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={getMinDate()}
                          max={getMaxDate()}
                          required
                        />
                        <Form.Text className="text-muted">Select a date within the next 30 days</Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-semibold">
                          <Clock size={16} className="me-1" />
                          Preferred Time
                        </Form.Label>
                        <Form.Select name="time" value={formData.time} onChange={handleChange} required>
                          <option value="">Select time slot</option>
                          {timeSlots.map((time) => (
                            <option key={time} value={time}>
                              {time}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      <FileText size={16} className="me-1" />
                      Upload Medical Documents (Optional)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      name="document"
                      onChange={handleChange}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <Form.Text className="text-muted">
                      Upload medical records, prescriptions, or test reports (Max 5MB)
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold">Reason for Visit / Symptoms</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Please describe your symptoms, reason for visit, or any specific concerns you'd like to discuss with the doctor..."
                      required
                    />
                  </Form.Group>

                  {/* Patient Information Summary */}
                  <Card className="bg-light mb-4">
                    <Card.Body>
                      <h6 className="mb-3">Patient Information</h6>
                      <Row>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Name:</strong> {user?.name}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong> {user?.email}
                          </p>
                        </Col>
                        <Col md={6}>
                          <p className="mb-1">
                            <strong>Phone:</strong> {user?.phone}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <Button variant="outline-secondary" onClick={() => window.history.back()} disabled={submitting}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={submitting} className="btn-custom">
                      {submitting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Booking...
                        </>
                      ) : (
                        <>
                          <Calendar size={16} className="me-2" />
                          Book Appointment
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Confirmation Modal */}
        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered size="lg">
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title>🎉 Appointment Request Submitted!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center py-4">
            <div className="mb-4">
              <div
                className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <Calendar size={32} className="text-white" />
              </div>
            </div>
            <h5>Your appointment request has been submitted successfully!</h5>
            <p className="text-muted mb-4">
              Dr. {doctor.fullname} will review your request and confirm the appointment. You'll receive a notification
              once it's approved.
            </p>
            <div className="bg-light p-4 rounded">
              <h6 className="mb-3">Appointment Details:</h6>
              <Row>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Doctor:</strong> {doctor.fullname}
                  </p>
                  <p className="mb-1">
                    <strong>Specialization:</strong> {doctor.specialization}
                  </p>
                  <p className="mb-1">
                    <strong>Date:</strong> {moment(formData.date).format("MMMM DD, YYYY")}
                  </p>
                </Col>
                <Col md={6}>
                  <p className="mb-1">
                    <strong>Time:</strong> {formData.time}
                  </p>
                  <p className="mb-1">
                    <strong>Fee:</strong> ${doctor.fees}
                  </p>
                  <p className="mb-1">
                    <strong>Status:</strong> <span className="text-warning">Pending Approval</span>
                  </p>
                </Col>
              </Row>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => (window.location.href = "/user/appointments")}>
              View My Appointments
            </Button>
            <Button variant="outline-secondary" onClick={() => (window.location.href = "/user")}>
              Book Another Appointment
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default BookAppointment
