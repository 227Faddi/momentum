import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../contexts/DataContext';

const EnsureGuest = () => {
  const { user } = useContext(DataContext);
  return user ? <Navigate to="/dashboard/personal" /> : <Outlet />;
};

export default EnsureGuest;
