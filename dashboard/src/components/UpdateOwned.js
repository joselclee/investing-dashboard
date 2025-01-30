import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../API/authContext';

const UpdateOwned = ({ show, handleClose, onOwnedUpdated }) => {
  const [yearsOwned, setYearsOwned] = useState('');
  const { currentUser } = useAuth();

  const handleUpdateOwned = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        await axios.put(
          'http://localhost:5000/api/v1/update-account',
          {
            user_id: userId,
            years_owned: yearsOwned,
          },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log(`Years owned updated: ${yearsOwned}`);
        onOwnedUpdated(yearsOwned);
        handleClose();
      } catch (error) {
        console.error('Error updating years owned:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Years Owned</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formYearsOwned">
            <Form.Label>Years Owned</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter years owned"
              value={yearsOwned}
              onChange={(e) => setYearsOwned(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateOwned}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateOwned;