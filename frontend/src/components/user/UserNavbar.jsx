"use client"
import { Navbar, Nav, Container, Button, Badge } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const UserNavbar = () => {
  const { user, logout } = useAuth()

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm border-bottom">
      <Container>
        <Navbar.Brand as={Link} to="/user" className="text-primary fw-bold fs-3">
          DocSpot
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/user" className="fw-semibold">
              Find Doctors
            </Nav.Link>
            <Nav.Link as={Link} to="/user/appointments" className="fw-semibold">
              My Appointments
            </Nav.Link>
            <Nav.Link as={Link} to="/user/add-document" className="fw-semibold">
              Documents
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Navbar.Text className="me-3">
              <Badge bg="primary" className="me-2">
                Patient
              </Badge>
              Welcome, <strong>{user?.name}</strong>
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

export default UserNavbar
