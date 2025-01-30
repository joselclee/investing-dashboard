import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useAuth } from '../API/authContext';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AddTicker from '../components/AddTicker';
import EditTicker from '../components/EditTicker';
import UpdateOwned from '../components/UpdateOwned';

const Profile = () => {
  const [showAddTickerModal, setShowAddTickerModal] = useState(false);
  const [showEditTickerModal, setShowEditTickerModal] = useState(false);
  const [showUpdateOwnedModal, setShowUpdateOwnedModal] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [PortfolioValue, setPortfolioValue] = useState(null);
  const [Owned, setOwned] = useState(null);
  const [selectedTicker, setSelectedTicker] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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
      } catch (error) {
        console.error('Error fetching tickers:', error.response ? error.response.data : error.message);
      }
    }
  };

  useEffect(() => {
    fetchTickers();
  }, [currentUser]);

  const handleLogout = async () => {
    await logout();
    navigate('/Home');
  };

  const handleOwnedUpdated = (yearsOwned) => {
    setOwned(yearsOwned);
  };

  const chartData = {
    labels: tickers.map(ticker => ticker.ticker),
    datasets: [
      {
        data: tickers.map(ticker => ticker.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
      },
    ],
  };

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>
            <Row>
              <h3>Profile</h3>
            </Row>
            <Row>
              <Button className="button-one" onClick={() => setShowUpdateOwnedModal(true)}>
                Update Account
              </Button>
            </Row>
          </Col>
          <Col/>
          <Col>
            <div className="pie-chart-container">
              <Pie data={chartData} />
            </div>
            <div>
              {PortfolioValue && <h3>Portfolio Value: ${PortfolioValue.toFixed(2)}</h3>}
            </div>
          </Col>
        </Row>
        <br/>
        <Row>
        <Col/>
        <Col/>
        <Col>
        <br/>
          <div className="container">
            <Button className="button-one" onClick={() => setShowAddTickerModal(true)}>
              Add Ticker
            </Button>
            <Button onClick={handleLogout} className="ms-2 button-rm">
              Logout
            </Button>
            <AddTicker
              show={showAddTickerModal}
              handleClose={() => setShowAddTickerModal(false)}
              onTickerAdded={handleTickerAdded}
            />
            <br/><br/>
            <ListGroup>
              {tickers.map((ticker) => (
                <ListGroup.Item key={ticker.ticker}>
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
            </div>
          </Col>
        </Row>
        <br/><br/>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile; 