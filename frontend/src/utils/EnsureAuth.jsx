import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import DataContext from '../contexts/DataContext'

const EnsureAuth = () => {
  const { user } = useContext(DataContext);
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default EnsureAuth;
