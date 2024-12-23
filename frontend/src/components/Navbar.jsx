import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { FaFire } from 'react-icons/fa';
import { logout } from '../services/api/auth';
import logo from '../assets/img/logo.svg';
import { useContext } from 'react';
import DataContext from '../contexts/DataContext';

const NavBar = () => {
  const { user, token, setUser, setToken } = useContext(DataContext);
  const location = useLocation();

  const handleLogout = async () => {
    setUser(null);
    setToken(null);
    logout(token);
  };

  let info;
  if (location.pathname.startsWith('/dashboard')) {
    info = (
      <>
        <h2>{user && user.username}</h2>
        <div className="flex items-center gap-1">
          <FaFire />
          {user && user.points}
        </div>
        <Link to="/add-goal">Add</Link>
        <button onClick={handleLogout}>Logout</button>
      </>
    );
  }

  return (
    <nav className="py-5 text-center">
      <div className="sm:flex justify-around items-center">
        <h2 className="mb-0 text-3xl cursor-pointer">
          <Link to="/">
            <img src={logo} alt="logo" className="w-10 inline-block mr-2" />
            Momentum
          </Link>
        </h2>
        <div className="flex justify-center gap-10 px-2 sm:pt-0 pt-8">
          {info}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
