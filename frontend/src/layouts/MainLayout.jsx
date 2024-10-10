import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const context = {
    user,
    setUser,
    token,
    setToken,
    serverUrl
  }

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
            <div className="flex flex-col min-h-screen">
                <NavBar {...context} />
                <Outlet context={{...context}} />
                <Footer />
                <ToastContainer
                  autoClose={1000}
                  draggable={true}
                />
            </div>
        </div>
    </div>
  )
}

export default MainLayout