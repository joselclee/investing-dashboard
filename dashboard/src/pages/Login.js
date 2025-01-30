import React, { useState } from 'react';
import { useAuth } from '../API/authContext';
import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import './Page.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (error) {
      setError('Error logging in: ' + error.message);
    }
  };

  if (currentUser) {
    return <Navigate to="/Profile" />;
  }

  return (
    <div>
      <Header />
      <Container className="full-height">
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col xs={12} md={4}>
            <h1 className="account-text">Login to your account</h1>
            <br />
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
                Login
              </Button>
              <br /><br />
              <div className="me-2">Don't have an account? Register</div>
              <Link to="/Register">
                <div>here.</div>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;