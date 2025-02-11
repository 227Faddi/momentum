import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useLocalStorage from "../hooks/useLocalStorage";
import { useLoginMutation } from "../services/api/auth";
import { setToken } from "../state/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const setRefreshToken = useLocalStorage("refresh");

  const guest = {
    email: import.meta.env.VITE_GUEST_EMAIL,
    password: import.meta.env.VITE_GUEST_PASSWORD,
  };

  const handleLogin = async () => {
    try {
      const result = await login(guest);
      dispatch(setToken(result.data.accessToken));
      setRefreshToken.setItem(result.data.refreshToken);
      navigate("/dashboard/personal");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-6 my-16 md:my-48">
      <div className="text-center space-y-2">
        <h1 className="sm:text-6xl text-3xl text-center">
          Set Your Goals, Achieve Success
        </h1>
        <p>
          and Earn Points for Every Milestone You Reach. Start Planning Today!
        </p>
      </div>
      <button
        className="cursor-pointer text-white bg-gradient-to-r from-purple-400 via-purple-600 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        onClick={handleLogin}
      >
        {isLoading ? "Loading..." : "Try as a Guest"}
      </button>
    </div>
  );
};

export default HomePage;
