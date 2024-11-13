const serverUrl = import.meta.env.VITE_SERVER_URL;
import { toast } from 'react-toastify';

// CURRENT USER
export const currentUser = async (token) => {
  try {
    const response = await fetch(`${serverUrl}/auth/current-user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'error' && data.message === 'Token expired') {
      localStorage.removeItem('token');
      location.reload();
    }
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    return data;
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

// LOGIN
export const login = async (credentials) => {
  try {
    const response = await fetch(`${serverUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    localStorage.setItem('token', data.token);
    return { ok: true };
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

// SIGNUP
export const signup = async (credentials) => {
  try {
    const response = await fetch(`${serverUrl}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    localStorage.setItem('token', data.token);
    return { ok: true };
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

// LOGOUT
export const logout = () => {
  toast.info('Logout completed successfully');
  localStorage.removeItem('token');
};
