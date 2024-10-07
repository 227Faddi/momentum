const serverUrl = import.meta.env.VITE_SERVER_URL;
import { toast } from 'react-toastify';

// LOGIN
export const login = async (credentials) => {
  try{
    const response = await fetch(`${serverUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
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
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
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


// GET USER FOR SOCIALS AUTH
export const user = async () => {
  try{
    const response = await fetch(`${serverUrl}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    const data = await response.json()
    if(data.status === 'error'){
      return toast.error(data.message)
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return { ok: true}
  } catch(err){
    return toast.error(`An error occurred. ${err.message}`)
  }
};

// LOGOUT
export const logout = async (token) => {
  try{
    const response = await fetch(`${serverUrl}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json()
    if(data.status === 'error'){
      return toast.error(data.message)
    }
    toast.success(data.message)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return { ok: true}
  } catch(err){
    return toast.error(`An error occurred. ${err.message}`)
  }
};