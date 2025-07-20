"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import { useNotification } from "../../context/NotificationContext"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, user } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.type === "admin") {
        navigate("/admin")
      } else if (user.isDoctor) {
        navigate("/doctor")
      } else {
        navigate("/user")
      }
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.post("http://localhost:5000/api/user/login", formData)
      const { user, token } = response.data

      login(user, token)
      addNotification("Login successful!", "success")

      // Redirect based on user type
      setTimeout(() => {
        if (user.type === "admin") {
          navigate("/admin")
        } else if (user.isDoctor) {
          navigate("/doctor")
        } else {
          navigate("/user")
        }
      }, 1000)
    } catch (error) {
      setError(error.response?.data?.message || "Login failed")
      addNotification("Login failed", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2 className="text-primary fw-bold">DocSpot</h2>
                <h4>Sign In</h4>
                <p className="text-muted">Enter your credentials to access your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100 btn-custom" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Alert variant="info" className="small">
                  <strong>Demo Credentials:</strong>
                  <br />
                  Admin: admin@docspot.com / password123
                  <br />
                  User: john.doe@example.com / password123
                  <br />
                  Doctor: dr.johnson@example.com / password123
                </Alert>
              </div>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary">
                    Sign up
                  </Link>
                </p>
                <p className="text-muted">
                  Want to join as a doctor?{" "}
                  <Link to="/apply-doctor" className="text-primary">
                    Apply here
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

export default Login
