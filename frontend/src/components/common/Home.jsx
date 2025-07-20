"use client"

import { Container, Row, Col, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Calendar, Clock, Shield, Users } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const Home = () => {
  const { user } = useAuth()

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <Container>
          <Link className="navbar-brand" to="/">
            <span className="text-primary fw-bold fs-3">DocSpot</span>
          </Link>
          <div className="navbar-nav ms-auto">
            {user ? (
              <div className="d-flex align-items-center">
                <span className="me-3">
                  Welcome, <strong>{user.name}</strong>
                </span>
                <Link to={user.type === "admin" ? "/admin" : user.isDoctor ? "/doctor" : "/user"}>
                  <Button variant="primary">Go to Dashboard</Button>
                </Link>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  <Button variant="outline-primary" className="me-2">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="nav-link">
                  <Button variant="primary">Register</Button>
                </Link>
              </>
            )}
          </div>
        </Container>
      </nav>

      {/* Hero Section */}
      <section className="hero-section medical-gradient">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4 text-white">Seamless Appointment Booking for Health</h1>
              <p className="lead mb-4 text-white">
                Booking a doctor's appointment has never been easier. With our convenient online platform, you can
                quickly and effortlessly schedule your appointments from the comfort of your own home.
              </p>
              <div className="d-flex gap-3">
                {user ? (
                  <Link to={user.type === "admin" ? "/admin" : user.isDoctor ? "/doctor" : "/user"}>
                    <Button size="lg" variant="light" className="btn-custom">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/register">
                      <Button size="lg" variant="light" className="btn-custom">
                        Book Appointment
                      </Button>
                    </Link>
                    <Link to="/apply-doctor">
                      <Button size="lg" variant="outline-light" className="btn-custom">
                        Join as Doctor
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Col>
            <Col lg={6}>
              <img
                src="/images/p2.png"
                alt="Doctor"
                className="img-fluid rounded-3"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-5 fw-bold">Why Choose DocSpot?</h2>
              <p className="lead text-muted">Experience the future of healthcare booking</p>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card border-0 h-100">
                <Card.Body className="text-center">
                  <Calendar size={48} className="text-primary mb-3" />
                  <Card.Title>Easy Scheduling</Card.Title>
                  <Card.Text>Book appointments 24/7 with real-time availability</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card border-0 h-100">
                <Card.Body className="text-center">
                  <Users size={48} className="text-primary mb-3" />
                  <Card.Title>Verified Doctors</Card.Title>
                  <Card.Text>All doctors are verified and approved by our admin team</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card border-0 h-100">
                <Card.Body className="text-center">
                  <Clock size={48} className="text-primary mb-3" />
                  <Card.Title>Flexible Timing</Card.Title>
                  <Card.Text>Morning, evening, or weekend appointments available</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3} className="mb-4">
              <Card className="feature-card border-0 h-100">
                <Card.Body className="text-center">
                  <Shield size={48} className="text-primary mb-3" />
                  <Card.Title>Secure Platform</Card.Title>
                  <Card.Text>Your medical information is safe and secure with us</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <h5 className="text-primary mb-3">DocSpot</h5>
              <p className="mb-2">Making healthcare accessible and convenient for everyone</p>
              <p className="text-muted small">© 2024 DocSpot. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default Home
