"use client"
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const DoctorNavbar = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/doctor" className="text-primary fw-bold fs-3">
          DocSpot
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/doctor" className="fw-semibold">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/doctor/appointments" className="fw-semibold">
              Appointments
            </Nav.Link>
            <Nav.Link as={Link} to="/doctor/schedule" className="fw-semibold">
              Schedule
            </Nav.Link>
            <Nav.Link as={Link} to="/doctor/profile" className="fw-semibold">
              Profile
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Navbar.Text className="me-3">
              <Badge bg="success" className="me-2">
                Doctor
              </Badge>
              Dr. <strong>{user?.name}</strong>
            </Navbar.Text>
            <Button variant="outline-primary" size="sm" onClick={logout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default DoctorNavbar
