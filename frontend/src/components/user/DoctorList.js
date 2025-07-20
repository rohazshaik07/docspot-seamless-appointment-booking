"use client"

import { useState, useEffect, useCallback } from "react"
import { Container, Row, Col, Card, Button, Badge, Form, InputGroup } from "react-bootstrap"
import { Calendar, Clock, MapPin, Phone, Star, Search } from "lucide-react"
import axios from "axios"
import { useNotification } from "../../context/NotificationContext"
import UserNavbar from "./UserNavbar"

const DoctorList = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState("")
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
      setDoctors(response.data.doctors)
      setFilteredDoctors(response.data.doctors)
    } catch (error) {
      addNotification("Failed to fetch doctors", "error")
    } finally {
      setLoading(false)
    }
  }, [addNotification])

  const filterDoctors = useCallback(() => {
    let filtered = doctors

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by specialization
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
    window.location.href = `/user/book-appointment/${doctorId}`
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
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold">Find Doctors</h2>
            <p className="text-muted">Search and filter doctors by specialization</p>
          </Col>
        </Row>

        {/* Search and Filter */}
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>
                <Search size={16} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search doctors by name, specialization, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Select value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.target.value)}>
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
              onClick={() => {
                setSearchTerm("")
                setSelectedSpecialization("")
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>

        {/* Results Count */}
        <Row className="mb-3">
          <Col>
            <p className="text-muted">
              Showing {filteredDoctors.length} of {doctors.length} doctors
            </p>
          </Col>
        </Row>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <Card className="text-center py-5">
            <Card.Body>
              <h4>No Doctors Found</h4>
              <p className="text-muted">Try adjusting your search criteria.</p>
            </Card.Body>
          </Card>
        ) : (
          <Row>
            {filteredDoctors.map((doctor) => (
              <Col md={6} lg={4} key={doctor._id} className="mb-4">
                <Card className="doctor-card h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <Card.Title className="h5">{doctor.fullname}</Card.Title>
                        <Badge bg="secondary" className="mb-2">
                          {doctor.specialization}
                        </Badge>
                      </div>
                      <div className="text-end">
                        <div className="h4 text-primary mb-0">${doctor.fees}</div>
                        <small className="text-muted">per visit</small>
                      </div>
                    </div>

                    <div className="mb-3">
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
                        <small>{doctor.address}</small>
                      </div>
                      <div className="d-flex align-items-center text-muted">
                        <Phone size={16} className="me-2" />
                        <small>{doctor.phone}</small>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-100 btn-custom"
                      onClick={() => handleBookAppointment(doctor._id)}
                    >
                      <Calendar size={16} className="me-2" />
                      Book Appointment
                    </Button>
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

export default DoctorList
