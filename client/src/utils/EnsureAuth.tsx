import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentRefreshToken } from "../state/authSlice";

const EnsureAuth = () => {
  const refreshToken = useSelector(selectCurrentRefreshToken);
  return refreshToken ? <Outlet /> : <Navigate to="/" />;
};

export default EnsureAuth;
