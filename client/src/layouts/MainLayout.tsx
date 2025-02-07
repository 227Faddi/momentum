import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";

const MainLayout = () => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex-grow w-full max-w-[1920px]">
          <div className="h-screen flex flex-col">
            <TopBar />
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
      <ToastContainer autoClose={1000} draggable={true} />
    </div>
  );
};

export default MainLayout;
