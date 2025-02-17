import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../api/auth";
import { setTokens } from "../state/authSlice";

export const GuestLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const guest = {
    email: import.meta.env.VITE_GUEST_EMAIL,
    password: import.meta.env.VITE_GUEST_PASSWORD,
  };

  const handleLogin = async () => {
    try {
      const result = await login(guest);
      dispatch(
        setTokens({
          accessToken: result.data?.accessToken,
          refreshToken: result.data?.refreshToken,
        })
      );
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      navigate("/dashboard/personal");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };
  return (
    <button
      className="text-white bg-gradient-to-r from-violet-500 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
      onClick={handleLogin}
    >
      {isLoading ? "Loading..." : "Try as a Guest"}
    </button>
  );
};
