import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import axios from 'axios';
import { auth } from './firebaseConfig';
import { apiUrl } from './config';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const idToken = await user.getIdToken();
        const userId = user.uid;
        const response = await axios.get(
          `${apiUrl}/account/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        console.log('Account details:', response.data);
        setAccountDetails({
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          stateOfResidence: response.data.state_of_residence,
          yearsOwned: response.data.years_owned,
          startDate: response.data.start_date,
          tickers: response.data.tickers,
          totalPortfolioValue: response.data.total_portfolio_value,
          tickerPercentages: response.data.ticker_percentages,
        });
      } else {
        setAccountDetails(null);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setAccountDetails(null);
  };

  const value = {
    currentUser,
    login,
    logout,
    accountDetails,
    setAccountDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};