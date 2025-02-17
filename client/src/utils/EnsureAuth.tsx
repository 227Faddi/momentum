import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../api/auth";
import { selectCurrentRefreshToken, setUser } from "../state/authSlice";

const EnsureAuth = () => {
  const refreshToken = useSelector(selectCurrentRefreshToken);
  const { data: user } = useMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch, user]);

  return refreshToken ? <Outlet /> : <Navigate to="/" />;
};

export default EnsureAuth;
