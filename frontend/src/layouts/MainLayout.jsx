import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';
import { ContextProvider } from '../contexts/DataContext';

const MainLayout = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]">
        <div className="flex flex-col min-h-screen">
          <ContextProvider>
            <NavBar />
            <Outlet />
          </ContextProvider>
          <Footer />
          <ToastContainer autoClose={1000} draggable={true} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
