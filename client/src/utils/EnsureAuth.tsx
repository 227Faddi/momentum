import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../state/authSlice";

const EnsureAuth = () => {
  const token = useSelector(selectCurrentToken);
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default EnsureAuth;
