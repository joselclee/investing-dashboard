import React, { useState } from 'react';
import { useAuth } from '../API/authContext';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './Page.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser, logout, auth } = useAuth(); // Ensure auth is destructured from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else {
        setError('Error creating account: ' + error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col xs={12} md={4}>
            <h1 className="account-text">Register for an account</h1>
            <br />
            {currentUser ? (
              <Button className="button-one" onClick={logout}>Logout</Button>
            ) : (
              <Form onSubmit={handleSubmit} className="form-container">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="account-text">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="account-text">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <br />
                <Button className="button-one" type="submit">
                  Create Account
                </Button>
                <br /><br />
                <div className="me-2">Already have an account? Login</div>
                <Link to="/Login">
                  <div>here.</div>
                </Link>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Register;