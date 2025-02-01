import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './API/authContext';
import { AccountProvider } from './API/accountContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AccountProvider>
        <App />
      </AccountProvider>
    </AuthProvider>
  </React.StrictMode>
);