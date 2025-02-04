import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from '../API/authContext';
import axios from 'axios';
import './SlideOutTab.css';
import { useNavigate } from 'react-router-dom';
import UpdateAccount from './UpdateAccount';
import { apiUrl } from '../API/config';

const SlideOutTab = ({ show, handleClose }) => {
  const { currentUser, logout, accountDetails } = useAuth();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showUpdateAccountModal, setShowUpdateAccountModal] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/Home');
    handleClose();
  };

  const handleDeleteAccount = async () => {
    if (currentUser) {
      try {
        const idToken = await currentUser.getIdToken();
        const userId = currentUser.uid;
        await axios.delete(
          `${apiUrl}/delete-account/${userId}`,
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

  const handleUpdateAccount = () => {
    setShowUpdateAccountModal(true);
  };

  return (
    <div className={`slide-out-tab ${show ? 'show' : ''}`}>
      <div className="slide-out-tab-content">
        <div className="top-buttons">
          <div className="account-text">
            Welcome back, {accountDetails ? accountDetails.firstName : 'Guest'}
          </div>
          <br/><br/>
          <Button className="button-two" href="/Profile" style={{ width: '100%', marginBottom: '10px' }}>
            Go to Account
          </Button>
          <Button className="button-two" onClick={handleUpdateAccount} style={{ width: '100%', marginBottom: '10px' }}>
            Update Account
          </Button>
          <Button className="button-one" onClick={handleClose} style={{ width: '100%', marginBottom: '10px' }}>
            Close
          </Button>
        </div>
        <div className="bottom-buttons">
          <Button className="button-two" onClick={handleLogout} style={{ width: '100%', marginBottom: '10px' }}>
            Logout
          </Button>
          <Button className="button-rm" onClick={() => setShowDeleteConfirm(true)} style={{ width: '100%' }}>
            Delete Account
          </Button>
        </div>
      </div>

      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-one" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button className="button-rm" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <UpdateAccount
        show={showUpdateAccountModal}
        handleClose={() => setShowUpdateAccountModal(false)}
        onOwnedUpdated={() => {}}
        accountDetails={accountDetails}
      />
    </div>
  );
};

export default SlideOutTab;