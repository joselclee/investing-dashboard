import React, { createContext, useContext, useState } from 'react';

const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
  const [accountDetails, setAccountDetails] = useState(null);

  return (
    <AccountContext.Provider value={{ accountDetails, setAccountDetails }}>
      {children}
    </AccountContext.Provider>
  );
};