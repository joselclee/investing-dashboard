import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../API/authContext';
import { useNavigate } from 'react-router-dom';
import './Page.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  Filler,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTicker from '../components/AddTicker';
import EditTicker from '../components/EditTicker';
import UpdateOwned from '../components/UpdateOwned';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  TimeScale,
  TimeSeriesScale,
  Filler
);

const Profile = () => {
  const [showAddTickerModal, setShowAddTickerModal] = useState(false);
  const [showEditTickerModal, setShowEditTickerModal] = useState(false);
  const [showUpdateOwnedModal, setShowUpdateOwnedModal] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [PortfolioValue, setPortfolioValue] = useState(null);
  const [Owned, setOwned] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const [dayHistory, setDayHistory] = useState([]);
  const { currentUser, logout } = useAuth();
  // const navigate = useNavigate();

  const handleTickerAdded = () => {
    // Handle any additional logic after a ticker is added
    console.log('Ticker added successfully');
    fetchTickers();
  };

  const fetchTickers = async () => {
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
        setTickers(response.data.tickers);
        setPortfolioValue(response.data.total_portfolio_value);
        setOwned(response.data.years_owned || 0); // Set Owned to 0 if no value is found
      } catch (error) {
        console.error('Error fetching tickers:', error.response ? error.response.data : error.message);
      }
    }
  };

  const fetchDayHistory = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        const response = await axios.get(
          `http://localhost:5000/api/v1/day-history/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log('Response:', response.data);
        setDayHistory(Object.entries(response.data.portfolio_performance).map(([time, value]) => ({ time, value })));
      } catch (error) {
        console.error('Error fetching day history:', error.response ? error.response.data : error.message);
      }
    }
  };

  useEffect(() => {
    fetchTickers();
    fetchDayHistory();
  }, [currentUser]);

  // const handleLogout = async () => {
  //   navigate('/Home');
  //   await logout();
  // };

  const handleOwnedUpdated = (yearsOwned) => {
    setOwned(yearsOwned);
  };

  const chartData = {
    labels: dayHistory.map(entry => entry.time),
    datasets: [
      {
        label: 'Day History',
        data: dayHistory.map(entry => entry.value),
        borderColor: 'rgb(22, 67, 34)',
        backgroundColor: 'rgb(22, 67, 34, 0.2 )',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div>
      <Header />
      <Container className="full-height">
        <Row>
          <Col sm={8}>
            <div className="line-chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
            <Row>
              <Col>
                <div>
                  {PortfolioValue && <div className="account-text">Portfolio Value: ${PortfolioValue.toFixed(2)}</div>}
                </div>
              </Col>
              <Col/>
            </Row>
          </Col>
          <Col sm={4}>
            <br/>
            <div style={{ width: '100%' }}>
              <Button className="button-two" onClick={() => setShowAddTickerModal(true)} style={{ width: '100%' }}>
                Add Ticker
              </Button>
              <AddTicker
                show={showAddTickerModal}
                handleClose={() => setShowAddTickerModal(false)}
                onTickerAdded={handleTickerAdded}
              />
            </div>
            <br/>
            <ListGroup style={{ width: '100%' }}>
              {tickers.map((ticker, index) => (
                <ListGroup.Item key={`${ticker.ticker}-${index}`}>
                  {ticker.ticker} - {ticker.value} shares
                  <Button
                    size="sm"
                    className="float-end button-two"
                    onClick={() => {
                      setSelectedTicker(ticker);
                      setShowEditTickerModal(true);
                    }}
                  >
                    Edit
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
            {selectedTicker && (
              <EditTicker
                show={showEditTickerModal}
                handleClose={() => setShowEditTickerModal(false)}
                ticker={selectedTicker}
                onTickerUpdated={fetchTickers}
              />
            )}
            <UpdateOwned
              show={showUpdateOwnedModal}
              handleClose={() => setShowUpdateOwnedModal(false)}
              onOwnedUpdated={handleOwnedUpdated}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;