import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentRefreshToken } from "../state/authSlice";

const EnsureGuest = () => {
  const refreshToken = useSelector(selectCurrentRefreshToken);
  return refreshToken ? <Navigate to="/dashboard/personal" /> : <Outlet />;
};

export default EnsureGuest;
