import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../layouts/MainLayout';

const EnsureGuest = () => {
  const { user } = useContext(AppContext);
  return user ? <Navigate to="/dashboard/personal" /> : <Outlet />;
};

export default EnsureGuest;
