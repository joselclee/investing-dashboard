import { Container } from 'react-bootstrap'
import { Navbar } from 'react-bootstrap'
import './Header.css'
const Header = () => {
  return (
    <Container fluid>
        <Navbar expand="lg" className="header bg-body">
            <Navbar.Brand>Smartlee</Navbar.Brand>
        </Navbar>
    </Container>
  )
}

export default Header