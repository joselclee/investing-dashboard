import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../API/authContext';

const UpdateAccount = ({ show, handleClose, onOwnedUpdated, accountDetails }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [stateOfResidence, setStateOfResidence] = useState('');
  const [startDate, setStartDate] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    if (accountDetails) {
      setFirstName(accountDetails.firstName || '');
      setLastName(accountDetails.lastName || '');
      setStateOfResidence(accountDetails.stateOfResidence || '');
      setStartDate(accountDetails.startDate || '');
    }
  }, [accountDetails]);

  const handleUpdateAccount = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        const data = {
          first_name: firstName,
          last_name: lastName,
          state_of_residence: stateOfResidence,
          start_date: startDate,
        };
        await axios.put(
          `https://ec2-3-94-107-189.compute-1.amazonaws.com:5000/api/v1/account/${userId}/update-account`,
          data,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log('Account updated successfully');
        onOwnedUpdated();
        handleClose();
      } catch (error) {
        console.error('Error updating account:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStateOfResidence">
            <Form.Label>State of Residence</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state of residence"
              value={stateOfResidence}
              onChange={(e) => setStateOfResidence(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formStartDate">
            <Form.Label>Portfolio Inception Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateAccount}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateAccount;