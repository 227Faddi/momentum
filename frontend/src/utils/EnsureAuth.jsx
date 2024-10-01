import { Navigate, Outlet, useOutletContext } from 'react-router-dom';

const EnsureAuth = () => {
    const { user, setUser, token, setToken, serverUrl } = useOutletContext();
    return user ? <Outlet context={{ user, setUser, token, setToken, serverUrl }} /> : <Navigate to='/' />
}

export default EnsureAuth