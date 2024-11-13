import { useState, createContext, useEffect } from 'react';
import { currentUser } from '../services/api/auth';

const DataContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const context = {
    user,
    setUser,
    token,
    setToken,
  };

  useEffect(() => {
    if (token) {
      const fetchCurrentUser = async () => {
        const data = await currentUser(token);
        setUser(data);
      };
      fetchCurrentUser();
    }
  }, [token]);

  return (
    <DataContext.Provider value={context}>{children}</DataContext.Provider>
  );
};

export default DataContext;
