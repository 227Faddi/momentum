import { Navigate, Outlet, useOutletContext, useLocation } from 'react-router-dom';

const EnsureGuest = () => {
    const { user, setUser, token, setToken, serverUrl } = useOutletContext();
    return user ? <Navigate to='/dashboard/personal' /> : <Outlet context={{ user, setUser, token, setToken, serverUrl }} />
}

export default EnsureGuest