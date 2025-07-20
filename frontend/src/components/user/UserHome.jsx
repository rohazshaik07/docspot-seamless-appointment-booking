"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Button, Badge, Spinner, Form, InputGroup } from "react-bootstrap"
import { Calendar, Clock, MapPin, Phone, Star, Search, Filter } from "lucide-react"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext"
import UserNavbar from "./UserNavbar"

const UserHome = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
  const { user } = useAuth()
  const { addNotification } = useNotification()

  const specializations = [
    "All Specializations",
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "General Medicine",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
  ]

  const fetchDoctors = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/doctors")
      setDoctors(response.data.doctors || [])
      setFilteredDoctors(response.data.doctors || [])
    } catch (error) {
      addNotification("Failed to fetch doctors", "error")
      setDoctors([])
      setFilteredDoctors([])
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  const filterDoctors = useCallback(() => {
    let filtered = doctors

    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.address?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedSpecialization && selectedSpecialization !== "All Specializations") {
      filtered = filtered.filter((doctor) => doctor.specialization === selectedSpecialization)
    }

    setFilteredDoctors(filtered)
  }, [doctors, searchTerm, selectedSpecialization])

  useEffect(() => {
    fetchDoctors()
  }, [fetchDoctors])

  useEffect(() => {
    filterDoctors()
  }, [filterDoctors])

  const handleBookAppointment = (doctorId) => {
    window.location.href = `/user/book-appointment?doctorId=${doctorId}`
  }

  if (loading) {
    return (
      <div>
        <UserNavbar />
        <Container className="py-5">
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading doctors...</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div>
      <UserNavbar />
      <Container className="py-4">
        {/* Welcome Section */}
        <Row className="mb-4">
          <Col>
            <div className="welcome-card p-4 rounded-3 bg-gradient-primary text-white">
              <h2 className="fw-bold mb-2">Welcome back, {user?.name}! 👋</h2>
              <p className="mb-0">Find and book appointments with verified healthcare professionals</p>
            </div>
          </Col>
        </Row>

        {/* Search and Filter Section */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Row className="align-items-end">
                  <Col md={6}>
                    <Form.Label className="fw-semibold">Search Doctors</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Search size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search by name, specialization, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Form.Label className="fw-semibold">Filter by Specialization</Form.Label>
                    <Form.Select
                      value={selectedSpecialization}
                      onChange={(e) => setSelectedSpecialization(e.target.value)}
                    >
                      {specializations.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedSpecialization("")
                      }}
                    >
                      <Filter size={16} className="me-1" />
                      Clear
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Results Count */}
        <Row className="mb-3">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Available Doctors ({filteredDoctors.length})</h5>
              <Badge bg="primary" className="fs-6">
                {filteredDoctors.length} doctors found
              </Badge>
            </div>
          </Col>
        </Row>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <div className="mb-4">
                <div
                  className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: "80px", height: "80px" }}
                >
                  <Search size={32} className="text-muted" />
                </div>
              </div>
              <h4>No Doctors Found</h4>
              <p className="text-muted mb-4">Try adjusting your search criteria or browse all available doctors.</p>
              <Button
                variant="primary"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedSpecialization("")
                }}
              >
                View All Doctors
              </Button>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {filteredDoctors.map((doctor) => (
              <Col md={6} lg={4} key={doctor._id} className="mb-4">
                <Card className="doctor-card h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1">
                        <Card.Title className="h5 mb-2">{doctor.fullname}</Card.Title>
                        <Badge bg="primary" className="mb-2">
                          {doctor.specialization}
                        </Badge>
                      </div>
                      <div className="text-end">
                        <div className="h4 text-success mb-0">${doctor.fees}</div>
                        <small className="text-muted">per visit</small>
                      </div>
                    </div>

                    <div className="doctor-info mb-4">
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <Star size={16} className="me-2 text-warning" />
                        <small>{doctor.experience} years experience</small>
                      </div>
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <Clock size={16} className="me-2" />
                        <small>{doctor.timings}</small>
                      </div>
                      <div className="d-flex align-items-center mb-2 text-muted">
                        <MapPin size={16} className="me-2" />
                        <small className="text-truncate">{doctor.address}</small>
                      </div>
                      <div className="d-flex align-items-center text-muted">
                        <Phone size={16} className="me-2" />
                        <small>{doctor.phone}</small>
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        className="btn-custom"
                        onClick={() => handleBookAppointment(doctor._id)}
                      >
                        <Calendar size={16} className="me-2" />
                        Book Appointment
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default UserHome
