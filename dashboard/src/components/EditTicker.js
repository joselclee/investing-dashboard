import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../API/authContext';
import { apiUrl } from '../API/config';

import '../pages/Page.css';

const EditTicker = ({ show, handleClose, ticker, onTickerUpdated }) => {
  const [newValue, setNewValue] = useState(ticker.value);
  const { currentUser } = useAuth();

  useEffect(() => {
    setNewValue(ticker.value);
  }, [ticker]);

  const handleUpdateTickerValue = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        await axios.put(
          `${apiUrl}/update-ticker-value`,
          {
            user_id: userId,
            ticker: ticker.ticker,
            value: newValue,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(`Ticker updated: ${ticker.ticker}, New Value: ${newValue}`);
        onTickerUpdated();
        handleClose();
      } catch (error) {
        console.error('Error updating ticker value:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Ticker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formValue">
            <Form.Label>New Value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter new value"
              value={newValue}
              onChange={(e) => setNewValue(parseFloat(e.target.value))}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-one" onClick={handleClose}>
          Close
        </Button>
        <Button className="button-two" onClick={handleUpdateTickerValue}>
          Update Ticker
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTicker;