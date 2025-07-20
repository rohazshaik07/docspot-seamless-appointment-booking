"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, ProgressBar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useNotification } from "../../context/NotificationContext"
import { User, Mail, Phone, MapPin, Award, Clock, DollarSign, FileText } from "lucide-react"

const specializations = [
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

const ApplyDoctor = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    timings: "",
    qualifications: "",
    licenseNumber: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { addNotification } = useNotification()
  const navigate = useNavigate()

  const totalSteps = 3

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await axios.post("http://localhost:5000/api/doctor/apply", formData)
      addNotification("Doctor application submitted successfully! Please wait for admin approval.", "success")
      navigate("/login")
    } catch (error) {
      setError(error.response?.data?.message || "Application failed")
      addNotification("Application failed", "error")
    } finally {
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div>
      <h4 className="mb-4">Personal Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <User size={16} className="me-1" />
              Full Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Smith"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <Mail size={16} className="me-1" />
              Email Address
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="doctor@example.com"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <Phone size={16} className="me-1" />
              Phone Number
            </Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter secure password"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">
          <MapPin size={16} className="me-1" />
          Clinic/Hospital Address
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Enter your complete clinic or hospital address"
          required
        />
      </Form.Group>
    </div>
  )

  const renderStep2 = () => (
    <div>
      <h4 className="mb-4">Professional Information</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <Award size={16} className="me-1" />
              Specialization
            </Form.Label>
            <Form.Select name="specialization" value={formData.specialization} onChange={handleChange} required>
              <option value="">Select your specialization</option>
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Years of Experience</Form.Label>
            <Form.Control
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="5"
              min="1"
              max="50"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <DollarSign size={16} className="me-1" />
              Consultation Fees ($)
            </Form.Label>
            <Form.Control
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              placeholder="100"
              min="1"
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              <Clock size={16} className="me-1" />
              Available Timings
            </Form.Label>
            <Form.Control
              type="text"
              name="timings"
              value={formData.timings}
              onChange={handleChange}
              placeholder="9:00 AM - 5:00 PM"
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">
          <FileText size={16} className="me-1" />
          Qualifications
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          placeholder="MBBS, MD, Fellowship details, etc."
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">Medical License Number</Form.Label>
        <Form.Control
          type="text"
          name="licenseNumber"
          value={formData.licenseNumber}
          onChange={handleChange}
          placeholder="Enter your medical license number"
          required
        />
      </Form.Group>
    </div>
  )

  const renderStep3 = () => (
    <div>
      <h4 className="mb-4">Review & Submit</h4>
      <Card className="bg-light">
        <Card.Body>
          <h6 className="mb-3">Please review your information:</h6>
          <Row>
            <Col md={6}>
              <p>
                <strong>Name:</strong> {formData.name}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Specialization:</strong> {formData.specialization}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Experience:</strong> {formData.experience} years
              </p>
              <p>
                <strong>Consultation Fee:</strong> ${formData.fees}
              </p>
              <p>
                <strong>Timings:</strong> {formData.timings}
              </p>
              <p>
                <strong>License Number:</strong> {formData.licenseNumber}
              </p>
            </Col>
          </Row>
          <hr />
          <p>
            <strong>Address:</strong> {formData.address}
          </p>
          <p>
            <strong>Qualifications:</strong> {formData.qualifications}
          </p>
        </Card.Body>
      </Card>

      <Alert variant="info" className="mt-3">
        <strong>Important:</strong> Your application will be reviewed by our admin team. You will receive an email
        notification once your application is approved or if additional information is needed.
      </Alert>
    </div>
  )

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-primary text-white text-center py-4">
              <h2 className="mb-2">Join DocSpot as a Doctor</h2>
              <p className="mb-0">Help patients by providing quality healthcare services</p>
            </Card.Header>
            <Card.Body className="p-5">
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <small className="fw-semibold">
                    Step {currentStep} of {totalSteps}
                  </small>
                  <small className="text-muted">{Math.round((currentStep / totalSteps) * 100)}% Complete</small>
                </div>
                <ProgressBar now={(currentStep / totalSteps) * 100} variant="primary" style={{ height: "8px" }} />
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <div>
                    {currentStep > 1 && (
                      <Button variant="outline-secondary" onClick={handlePrevious}>
                        Previous
                      </Button>
                    )}
                  </div>
                  <div>
                    {currentStep < totalSteps ? (
                      <Button variant="primary" onClick={handleNext}>
                        Next Step
                      </Button>
                    ) : (
                      <Button type="submit" variant="success" disabled={loading} className="px-4">
                        {loading ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Submitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Form>

              <div className="text-center mt-4">
                <p className="text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary fw-semibold">
                    Sign in here
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ApplyDoctor
