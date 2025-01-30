import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Container, Row, Col, Form, Button, OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { animateScroll as scroll } from 'react-scroll';
import { useAuth } from '../API/authContext';
import './Page.css';

ChartJS.register(ArcElement, ChartTooltip, Legend);

const Optimize = () => {
  const initialFormData = {
    portfolio_value: '',
    tickers: [''],
    weights: [''],
    years: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isDollar, setIsDollar] = useState(false);
  const [oldPortfolio, setOldPortfolio] = useState({ tickers: [], weights: [] });
  const [newPortfolio, setNewPortfolio] = useState({ tickers: [], weights: [] });
  const [isGraphVisible, setIsGraphVisible] = useState(false);
  const { currentUser } = useAuth();

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

  const removeTicker = (index) => {
    if (formData.tickers.length > 1) {
      const newTickers = formData.tickers.filter((_, i) => i !== index);
      const newWeights = formData.weights.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        tickers: newTickers,
        weights: newWeights
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      weights: isDollar ? formData.weights.map(weight => (parseFloat(weight) / parseFloat(formData.portfolio_value)).toFixed(2)) : formData.weights.map(weight => (parseFloat(weight) / 100).toFixed(2))
    };
    try {
      const response = await axios.post('http://localhost:5000/api/v1/optimize-portfolio', formattedData);
      console.log('Response:', response.data); 
      setOldPortfolio({ tickers: formData.tickers, weights: formattedData.weights });
      setNewPortfolio({ tickers: formData.tickers, weights: response.data.optimal_weights });
      setIsGraphVisible(true);
      scroll.scrollToBottom();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setIsGraphVisible(false);
  };

  const handleAutofill = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        const response = await axios.get(
          `http://localhost:5000/api/v1/account/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
            params: {
              user_id: userId,
            },
          }
        );
        const tickers = response.data.tickers.map(ticker => ticker.ticker);
        const weights = response.data.tickers.map(ticker => ticker.value);
        setFormData({
          ...formData,
          tickers,
          weights
        });
      } catch (error) {
        console.error('Error fetching tickers:', error.response ? error.response.data : error.message);
      }
    }
  };

  const generateChartData = (portfolio) => {
    if (!portfolio || !portfolio.tickers || !portfolio.weights) {
      return {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [],
          },
        ],
      };
    }

    return {
      labels: portfolio.tickers,
      datasets: [
        {
          data: portfolio.weights.map(weight => parseFloat(weight) * 100),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
        },
      ],
    };
  };

  const chartOptions = {
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
      animateRotate: true,
    },
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Header />
      <Container className="full-height">
        <br/>
        <br/>
        <Row className="left-align">
        <Col />
          <Col>
            <Form onSubmit={handleSubmit}>
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
              <Form.Group controlId="years">
                <OverlayTrigger
                  placement="top"
                  overlay={<BootstrapTooltip id="tooltip-years">Number of years of past performance to include for decision</BootstrapTooltip>}
                >
                  <Form.Label>Years</Form.Label>
                </OverlayTrigger>
                <Form.Control
                  type="number"
                  name="years"
                  value={formData.years}
                  onChange={handleChange}
                />
              </Form.Group>
              <br/>
              <Form.Group controlId="tickers">
                <Form.Label>Tickers and Weights</Form.Label>
                {formData.tickers.map((ticker, index) => (
                  <Row key={index} className="mb-2">
                    <Col>
                      <Form.Group controlId={`ticker-${index}`}>
                        <Form.Control
                          type="text"
                          placeholder="Ticker"
                          value={ticker}
                          onChange={(e) => handleTickerChange(index, e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId={`weight-${index}`}>
                        <Form.Control
                          type="number"
                          placeholder={isDollar ? "Weight ($)" : "Weight (%)"}
                          value={formData.weights[index]}
                          onChange={(e) => handleWeightChange(index, e.target.value)}
                          min="0"
                          max={isDollar ? formData.portfolio_value : "100"}
                          step="0.01"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs="auto">
                      <Button
                        className="button-rm"
                        onClick={() => removeTicker(index)}
                        disabled={formData.tickers.length === 1}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <br/>
                <Button onClick={addTicker} className="me-2 button-one">
                  Add Ticker
                </Button>
                <Button className="button-one me-2" type="submit">
                  Submit
                </Button>
                <Button className="button-one me-2" type="button" onClick={handleReset}>
                  Reset
                </Button>
                {currentUser && (
                  <Button className="button-one me-2" type="button" onClick={handleAutofill}>
                    Autofill
                  </Button>
                )}
                <Form.Check 
                  className="custom-switch"
                  type="switch"
                  id="weight-switch"
                  label={`Switch to ${isDollar ? 'Percentage' : 'Dollar'} Values`}
                  checked={isDollar}
                  onChange={() => setIsDollar(!isDollar)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col />
          <Row>
          <Col>
            {isGraphVisible && (
              <div>
                <h3>Old Portfolio</h3>
                <div className="pie-chart-container">
                  <Pie data={generateChartData(oldPortfolio)} options={chartOptions} />
                </div>
                <h3>New Portfolio</h3>
                <div className="pie-chart-container">
                  <Pie data={generateChartData(newPortfolio)} options={chartOptions} />
                </div>
              </div>
            )}
          </Col>
          </Row>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Optimize;