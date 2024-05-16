import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, type, id) => {
    setToken(token);
    setUserType(type);
    setUserId(id);
    Cookies.set('token', token, { expires: 1 });
    Cookies.set('userType', type, { expires: 1 });
    Cookies.set('userId', id, { expires: 1 });
    setIsLoggedIn(true);
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    setUserId(null);
    Cookies.remove('token');
    Cookies.remove('userType');
    Cookies.remove('userId');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUserType = Cookies.get('userType');
    const storedUserId = Cookies.get('userId');

    if (storedToken && storedUserType && storedUserId) {
      setToken(storedToken);
      setUserType(storedUserType);
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const contextValue = {
    isLoggedIn,
    token,
    userType,
    userId,
    login,
    logout,
  };

  return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
  );
};

export default AuthContextProvider;
