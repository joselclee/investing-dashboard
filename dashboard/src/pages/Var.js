// dashboard/src/pages/Var.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import './Page.css'; // Import the CSS file

const Var = () => {
  const [formData, setFormData] = useState({
    years: '',
    portfolio_value: '',
    days: '',
    simulations: '',
    confidence_interval: '',
    weights: [''],
    tickers: ['']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTickerChange = (index, value) => {
    const newTickers = [...formData.tickers];
    newTickers[index] = value;
    setFormData({
      ...formData,
      tickers: newTickers
    });
  };

  const handleWeightChange = (index, value) => {
    const newWeights = [...formData.weights];
    newWeights[index] = value;
    setFormData({
      ...formData,
      weights: newWeights
    });
  };

  const addTicker = () => {
    setFormData({
      ...formData,
      tickers: [...formData.tickers, ''],
      weights: [...formData.weights, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/v1/monte-carlo-var', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container fluid style={{ paddingBottom: '100px'}}>
      <Row className="left-align">
        <Col>
          <Form onSubmit={handleSubmit} className="form-left-align">
            <Form.Group controlId="years">
              <Form.Label>Years</Form.Label>
              <Form.Control
                type="number"
                name="years"
                value={formData.years}
                onChange={handleChange}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="portfolio_value">
              <Form.Label>Portfolio Value</Form.Label>
              <Form.Control
                type="number"
                name="portfolio_value"
                value={formData.portfolio_value}
                onChange={handleChange}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="days">
              <Form.Label>Days</Form.Label>
              <Form.Control
                type="number"
                name="days"
                value={formData.days}
                onChange={handleChange}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="simulations">
              <Form.Label>Simulations</Form.Label>
              <Form.Control
                type="number"
                name="simulations"
                value={formData.simulations}
                onChange={handleChange}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="confidence_interval">
              <Form.Label>Confidence Interval</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="confidence_interval"
                value={formData.confidence_interval}
                onChange={handleChange}
              />
            </Form.Group>
            <br/>
            <Form.Group controlId="tickers">
              <Form.Label>Tickers and Weights</Form.Label>
              {formData.tickers.map((ticker, index) => (
                <Row key={index} className="mb-2">
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Ticker"
                      value={ticker}
                      onChange={(e) => handleTickerChange(index, e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      placeholder="Weight"
                      value={formData.weights[index]}
                      onChange={(e) => handleWeightChange(index, e.target.value)}
                    />
                  </Col>
                </Row>
              ))}
              <Button onClick={addTicker} className="me-2 button-one">
                Add Ticker
              </Button>
              <Button className="button-one" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col />
        <Col />
        <Col />
      </Row>
    </Container>
    <Footer />
    </div>
  );
};

export default Var;