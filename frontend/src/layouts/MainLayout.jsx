import { useState, useEffect, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { currentUser } from '../services/api/auth';

export const AppContext = createContext(null);

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const context = {
    user,
    setUser,
    token,
    setToken,
    serverUrl,
  };

  // GET USER FETCH
  useEffect(() => {
    if (token) {
      console.log('use effect  current user' + token)
      const fetchCurrentUser = async () => {
        setUser(await currentUser(token));
      };
      fetchCurrentUser();
    }
  }, [token]);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className="flex flex-col min-h-screen">
          <AppContext.Provider value={context}>
            <NavBar />
            <Outlet />
            <Footer />
            <ToastContainer autoClose={1000} draggable={true} />
          </AppContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
