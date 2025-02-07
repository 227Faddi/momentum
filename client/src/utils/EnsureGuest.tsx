import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectCurrentToken } from "../state/authSlice";

const EnsureGuest = () => {
  const token = useSelector(selectCurrentToken);
  return token ? <Navigate to="/dashboard/personal" /> : <Outlet />;
};

export default EnsureGuest;
