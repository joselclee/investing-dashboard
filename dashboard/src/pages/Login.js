import React, { useState } from 'react';
import { useAuth } from '../API/authContext';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, logout, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Col xs={12} md={4}>
            {currentUser ? (
              <Button className="button-one" onClick={logout}>Logout</Button>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="account-text">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <br/>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="account-text">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <br/>
                <Button className="button-one" type="submit">
                  Login
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;