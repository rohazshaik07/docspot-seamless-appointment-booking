"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Table, Badge, Button, Modal, Form } from "react-bootstrap"
import { Calendar, User, FileText, CheckCircle, XCircle, Eye } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext"
import DoctorNavbar from "./DoctorNavbar"
import moment from "moment"

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([])
  const [filteredAppointments, setFilteredAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [modalType, setModalType] = useState("view") // view, approve, reject, complete
  const [statusFilter, setStatusFilter] = useState("all")
  const [notes, setNotes] = useState("")
  const [updating, setUpdating] = useState(false)
  const { user } = useAuth()
  const { addNotification } = useNotification()

  // Set axios default headers
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:5000/api/doctor/appointments")

      if (response.data.success) {
        setAppointments(response.data.appointments || [])
      } else {
        throw new Error(response.data.message || "Failed to fetch appointments")
      }
    } catch (error) {
      console.error("Fetch appointments error:", error)
      addNotification("Failed to fetch appointments", "error")

      // Mock data for demo
      const mockAppointments = [
        {
          _id: "1",
          userInfo: {
            _id: "user1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1234567890",
          },
          date: "2025-07-20",
          time: "10:00 AM",
          status: "pending",
          notes: "Regular checkup and blood pressure monitoring",
          document: "medical-report.pdf",
          createdAt: "2025-07-19",
        },
        {
          _id: "2",
          userInfo: {
            _id: "user2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1234567891",
          },
          date: "2025-07-21",
          time: "2:00 PM",
          status: "approved",
          notes: "Follow-up consultation for skin condition",
          document: "",
          createdAt: "2025-07-18",
        },
      ]
      setAppointments(mockAppointments)
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  const filterAppointments = useCallback(() => {
    let filtered = appointments
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) => appointment.status === statusFilter)
    }
    setFilteredAppointments(filtered)
  }, [appointments, statusFilter])

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  useEffect(() => {
    filterAppointments()
  }, [filterAppointments])

  const handleAppointmentAction = async (appointmentId, action, additionalNotes = "") => {
    try {
      setUpdating(true)

      const response = await axios.put(`http://localhost:5000/api/doctor/appointments/${appointmentId}/status`, {
        status: action,
        notes: additionalNotes,
      })

      if (response.data.success) {
        addNotification(response.data.message || `Appointment ${action} successfully`, "success")
        await fetchAppointments() // Refresh appointments
        setShowModal(false)
        setNotes("")
        setSelectedAppointment(null)
      } else {
        throw new Error(response.data.message || `Failed to ${action} appointment`)
      }
    } catch (error) {
      console.error("Appointment action error:", error)
      const errorMessage = error.response?.data?.message || error.message || `Failed to ${action} appointment`
      addNotification(errorMessage, "error")
    } finally {
      setUpdating(false)
    }
  }

  const openModal = (appointment, type) => {
    setSelectedAppointment(appointment)
    setModalType(type)
    setNotes("")
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedAppointment(null)
    setNotes("")
    setModalType("view")
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      approved: "success",
      completed: "info",
      cancelled: "danger",
      rejected: "danger",
    }
    return <Badge bg={variants[status] || "secondary"}>{status.toUpperCase()}</Badge>
  }

  const getStatusStats = () => {
    return {
      total: appointments.length,
      pending: appointments.filter((a) => a.status === "pending").length,
      approved: appointments.filter((a) => a.status === "approved").length,
      completed: appointments.filter((a) => a.status === "completed").length,
    }
  }

  const stats = getStatusStats()

  if (loading) {
    return (
      <div>
        <DoctorNavbar />
        <Container className="py-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <DoctorNavbar />
      <Container className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Appointment Management</h2>
            <p className="text-muted">Manage your patient appointments and schedule</p>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-4">
          <Col md={3} className="mb-3">
            <Card className="stats-card border-0 text-center">
              <Card.Body>
                <h3 className="text-primary">{stats.total}</h3>
                <p className="mb-0 text-muted">Total Appointments</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stats-card border-0 text-center">
              <Card.Body>
                <h3 className="text-warning">{stats.pending}</h3>
                <p className="mb-0 text-muted">Pending Approval</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stats-card border-0 text-center">
              <Card.Body>
                <h3 className="text-success">{stats.approved}</h3>
                <p className="mb-0 text-muted">Approved</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-3">
            <Card className="stats-card border-0 text-center">
              <Card.Body>
                <h3 className="text-info">{stats.completed}</h3>
                <p className="mb-0 text-muted">Completed</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Appointments Table */}
        <Card className="shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <Row className="align-items-center">
              <Col>
                <h5 className="mb-0 fw-semibold">All Appointments ({filteredAppointments.length})</h5>
              </Col>
              <Col xs="auto">
                <Form.Select
                  size="sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: "150px" }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </Form.Select>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-0">
            <Table responsive hover className="mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 fw-semibold">Patient</th>
                  <th className="border-0 fw-semibold">Date & Time</th>
                  <th className="border-0 fw-semibold">Contact</th>
                  <th className="border-0 fw-semibold">Status</th>
                  <th className="border-0 fw-semibold">Booked On</th>
                  <th className="border-0 fw-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="py-3">
                      <div>
                        <div className="fw-semibold">{appointment.userInfo.name}</div>
                        <small className="text-muted">{appointment.userInfo.email}</small>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <div className="fw-semibold">{moment(appointment.date).format("MMM DD, YYYY")}</div>
                        <small className="text-muted">{appointment.time}</small>
                      </div>
                    </td>
                    <td className="py-3">
                      <small className="text-muted">{appointment.userInfo.phone}</small>
                    </td>
                    <td className="py-3">{getStatusBadge(appointment.status)}</td>
                    <td className="py-3">
                      <small className="text-muted">{moment(appointment.createdAt).format("MMM DD")}</small>
                    </td>
                    <td className="py-3">
                      <div className="d-flex gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => openModal(appointment, "view")}>
                          <Eye size={14} />
                        </Button>
                        {appointment.status === "pending" && (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => openModal(appointment, "approve")}
                              disabled={updating}
                            >
                              <CheckCircle size={14} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => openModal(appointment, "reject")}
                              disabled={updating}
                            >
                              <XCircle size={14} />
                            </Button>
                          </>
                        )}
                        {appointment.status === "approved" && (
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => openModal(appointment, "complete")}
                            disabled={updating}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {filteredAppointments.length === 0 && (
              <div className="text-center py-5">
                <Calendar size={48} className="text-muted mb-3" />
                <h5>No appointments found</h5>
                <p className="text-muted">No appointments match your current filter.</p>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Appointment Details Modal */}
        <Modal show={showModal} onHide={closeModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "view" && "Appointment Details"}
              {modalType === "approve" && "Approve Appointment"}
              {modalType === "reject" && "Reject Appointment"}
              {modalType === "complete" && "Complete Appointment"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedAppointment && (
              <div>
                {/* Patient Information */}
                <Card className="mb-3">
                  <Card.Header>
                    <h6 className="mb-0">
                      <User size={16} className="me-2" />
                      Patient Information
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <p>
                          <strong>Name:</strong> {selectedAppointment.userInfo.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedAppointment.userInfo.email}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p>
                          <strong>Phone:</strong> {selectedAppointment.userInfo.phone}
                        </p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Appointment Details */}
                <Card className="mb-3">
                  <Card.Header>
                    <h6 className="mb-0">
                      <Calendar size={16} className="me-2" />
                      Appointment Details
                    </h6>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={6}>
                        <p>
                          <strong>Date:</strong> {moment(selectedAppointment.date).format("MMMM DD, YYYY")}
                        </p>
                        <p>
                          <strong>Time:</strong> {selectedAppointment.time}
                        </p>
                      </Col>
                      <Col md={6}>
                        <p>
                          <strong>Status:</strong> {getStatusBadge(selectedAppointment.status)}
                        </p>
                        <p>
                          <strong>Booked On:</strong> {moment(selectedAppointment.createdAt).format("MMM DD, YYYY")}
                        </p>
                      </Col>
                    </Row>
                    {selectedAppointment.notes && (
                      <div>
                        <strong>Patient Notes:</strong>
                        <p className="mt-2 p-3 bg-light rounded">{selectedAppointment.notes}</p>
                      </div>
                    )}
                    {selectedAppointment.document && (
                      <div>
                        <strong>Attached Document:</strong>
                        <p className="mt-2">
                          <FileText size={16} className="me-2" />
                          {selectedAppointment.document}
                        </p>
                      </div>
                    )}
                  </Card.Body>
                </Card>

                {/* Action Forms */}
                {(modalType === "approve" || modalType === "reject" || modalType === "complete") && (
                  <Card>
                    <Card.Header>
                      <h6 className="mb-0">
                        {modalType === "approve" && "Approval Notes"}
                        {modalType === "reject" && "Rejection Reason"}
                        {modalType === "complete" && "Consultation Summary"}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <Form.Group>
                        <Form.Label>
                          {modalType === "approve" && "Add any notes for the patient (optional)"}
                          {modalType === "reject" && "Please provide a reason for rejection"}
                          {modalType === "complete" && "Add consultation summary and follow-up instructions"}
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder={
                            modalType === "approve"
                              ? "Please arrive 15 minutes early..."
                              : modalType === "reject"
                                ? "Unfortunately, I'm not available at this time..."
                                : "Patient examined, vital signs normal. Prescribed medication..."
                          }
                          required={modalType === "reject" || modalType === "complete"}
                        />
                      </Form.Group>
                    </Card.Body>
                  </Card>
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} disabled={updating}>
              Cancel
            </Button>
            {modalType === "approve" && (
              <Button
                variant="success"
                onClick={() => handleAppointmentAction(selectedAppointment._id, "approved", notes)}
                disabled={updating}
              >
                {updating ? "Approving..." : "Approve Appointment"}
              </Button>
            )}
            {modalType === "reject" && (
              <Button
                variant="danger"
                onClick={() => handleAppointmentAction(selectedAppointment._id, "rejected", notes)}
                disabled={!notes.trim() || updating}
              >
                {updating ? "Rejecting..." : "Reject Appointment"}
              </Button>
            )}
            {modalType === "complete" && (
              <Button
                variant="info"
                onClick={() => handleAppointmentAction(selectedAppointment._id, "completed", notes)}
                disabled={!notes.trim() || updating}
              >
                {updating ? "Completing..." : "Mark as Completed"}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default DoctorAppointments
