import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../API/authContext';

const AddTicker = ({ show, handleClose, onTickerAdded }) => {
  const [newTicker, setNewTicker] = useState('');
  const [newValue, setNewValue] = useState('');
  const { currentUser } = useAuth();

  const handleAddTicker = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        const payload = {
          user_id: userId,
          tickers: [
            {
              ticker: newTicker,
              value: parseFloat(newValue),
            },
          ],
        };
        await axios.post(
          'https://ec2-3-94-107-189.compute-1.amazonaws.com:5000/api/v1/add-tickers',
          payload,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(`Ticker: ${newTicker}, Value: ${newValue}`);
        setNewTicker('');
        setNewValue('');
        if (onTickerAdded) {
          onTickerAdded();
        }
        handleClose();
      } catch (error) {
        console.error('Error adding ticker:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Ticker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTicker">
            <Form.Label>Ticker</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ticker"
              value={newTicker}
              onChange={(e) => setNewTicker(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formValue">
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTicker}>
          Add Ticker
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTicker;