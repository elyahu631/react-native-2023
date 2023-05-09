import React, { createContext, useState } from 'react';

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <userContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </userContext.Provider>
  );
};
