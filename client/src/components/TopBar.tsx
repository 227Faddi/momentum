import { FaFire } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout, selectCurrentUser } from "../state/authSlice";
import { GuestLogin } from "./GuestLogin";

const TopBar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="py-6 sm:py-8 text-center">
      <div className="flex flex-col sm:flex-row justify-around items-center">
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 px-2 sm:pt-0 pt-8">
          {pathname === "/" ? (
            <div className="flex gap-2"></div>
          ) : pathname === "/signup" || pathname === "/login" ? (
            <GuestLogin />
          ) : (
            <>
              <div className="flex items-center gap-4">
                <h2>{user && user.username}</h2>
                <div className="flex items-center gap-1">
                  <FaFire />
                  {user && user.points}
                </div>
              </div>
              <div className="flex items-center gap-5">
                <Link to="/add-goal">New</Link>
                {pathname === "/leaderboard" ? (
                  <Link to="/dashboard/personal">Dashboard</Link>
                ) : (
                  <Link to="/leaderboard">Leaderboard</Link>
                )}
                <button onClick={handleLogout} className="cursor-pointer">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
