import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useAuth } from '../API/authContext';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <div className="header-wrapper">
      <Navbar expand="lg" className="custom-header">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="custom-button" href="/Home">Home</Nav.Link>
            <Nav.Link className="custom-button" href="/Optimize">Optimize Portfolio</Nav.Link>
            <Nav.Link className="custom-button" href="/Var">Simulate Value at Risk</Nav.Link>
            <Nav.Link className="custom-button" href="/About">About</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {currentUser ? (
              <Nav.Link className="custom-button login" href="/Profile">Account</Nav.Link>
            ) : (
              <Nav.Link className="custom-button login" href="/Login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;