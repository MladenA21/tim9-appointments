import { createContext, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setToken(token);
    Cookies.set('token', token, { expires: 1 });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    Cookies.remove('token');
    setIsLoggedIn(false);
  };

  const contextValue = {
    isLoggedIn,
    token,
    login,
    logout,
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');

    if (storedToken) {
      login(storedToken);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;