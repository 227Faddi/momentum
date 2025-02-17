import { FaFire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../api/auth";
import useLocalStorage from "../hooks/useLocalStorage";
import { logout, selectCurrentUser, setTokens } from "../state/authSlice";

const TopBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const refreshToken = useLocalStorage("refresh");
  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    refreshToken.removeItem();
    dispatch(logout());
    navigate("/");
  };

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
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <nav className="py-6 sm:py-8 text-center">
      <div className="sm:flex justify-around items-center">
        <h2 className="mb-0 text-3xl cursor-pointer">
          <Link to="/">
            <img
              src="/img/logo.svg"
              alt="logo"
              className="w-10 inline-block mr-2"
            />
            Momentum
          </Link>
        </h2>
        <div className="flex justify-center gap-10 px-2 sm:pt-0 pt-8">
          {pathname === "/" ? (
            <div className="flex gap-2"></div>
          ) : pathname === "/signup" || pathname === "/login" ? (
            <button
              className="cursor-pointer text-white bg-gradient-to-r from-purple-400 via-purple-600 to-purple-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={handleLogin}
            >
              {isLoading ? "Loading..." : "Try as a Guest"}
            </button>
          ) : (
            <>
              <h2>{user && user.username}</h2>
              <div className="flex items-center gap-1">
                <FaFire />
                {user && user.points}
              </div>
              <Link to="/add-goal">Add</Link>
              {pathname === "/leaderboard" ? (
                <Link to="/dashboard/personal">Dashboard</Link>
              ) : (
                <Link to="/leaderboard">Leaderboard</Link>
              )}
              <button onClick={handleLogout} className="cursor-pointer">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
