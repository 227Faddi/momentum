import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppContext } from '../layouts/MainLayout';

const EnsureAuth = () => {
  const { user } = useContext(AppContext);
  console.log(user)
  return user ? <Outlet /> : <Navigate to="/" />;
};

export default EnsureAuth;
