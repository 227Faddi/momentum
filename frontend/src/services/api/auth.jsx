const serverUrl = import.meta.env.VITE_SERVER_URL;
import { toast } from 'react-toastify';

// LOGIN
export const login = async (credentials) => {
  try{
    const response = await fetch(`${serverUrl}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    const data = await response.json()

    if(data.status === 'error'){
      return toast.error(data.message)
    }

    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));

    return { ok: true}
  } catch(err){
    return toast.error(`An error occurred. ${err.message}`)
  }
}

// SIGNUP
export const signup = async (credentials) => {
  try{
    const response = await fetch(`${serverUrl}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
    const data = await  response.json()
    if(data.status === 'error'){
      return toast.error(data.message)
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return { ok: true}
  } catch(err){
    return toast.error(`An error occurred. ${err.message}`)
  }
}

// LOGOUT
export const logout = (token) => {
  toast.success('Logout completed successfully')
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};