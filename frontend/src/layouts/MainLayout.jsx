import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const MainLayout = ({ user, setUser, serverUrl, token, setToken }) => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
            <div className="flex flex-col min-h-screen">
                <NavBar user={user} setUser={setUser} setToken={setToken} />
                <Outlet context={{ user, setUser, serverUrl, token, setToken }} />
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