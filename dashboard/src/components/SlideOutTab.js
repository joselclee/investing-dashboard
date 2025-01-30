import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from '../API/authContext';
import axios from 'axios';
import './SlideOutTab.css';
import { useNavigate } from 'react-router-dom';

const SlideOutTab = ({ show, handleClose }) => {
  const { currentUser, logout } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/Home')
    handleClose();
  };

  const handleDeleteAccount = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        await axios.delete(
          `http://localhost:5000/api/v1/delete-account/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        await logout();
        handleClose();
      } catch (error) {
        console.error('Error deleting account:', error.response ? error.response.data : error.message);
      }
    }
  };

  return (
    <div className={`slide-out-tab ${show ? 'show' : ''}`}>
      <div className="slide-out-tab-content">
        <br/>
        <div className="account-text">
            Hello, {currentUser ? currentUser.email : 'Guest'} {/*Replace with username when implemented*/}
        </div>
        <br/><br/>
        <Button className="button-two" onClick={handleLogout} style={{ width: '100%', marginBottom: '10px' }}>
          Logout
        </Button>
        <br/><br/>
        <Button className="button-one" onClick={handleClose} style={{ width: '100%', marginTop: '10px' }}>
          Close
        </Button>
        <br/><br/>
        <Button className="button-rm" onClick={() => setShowDeleteConfirm(true)} style={{ width: '100%' }}>
          Delete Account
        </Button>
      </div>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SlideOutTab;