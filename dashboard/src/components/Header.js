import { Nav, Navbar } from 'react-bootstrap'
import './Header.css'

const Header = () => {
  return (
    <div>
        <Navbar expand="lg" className="custom-header">
            <Navbar.Brand className="custom-brand">Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Optimize Portfolio</Nav.Link>
                <Nav.Link href="#link">Simulate Value at Risk</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
  )
}

export default Header