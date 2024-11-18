const serverUrl = import.meta.env.VITE_SERVER_URL;
import { toast } from 'react-toastify';

// GET GOAL FETCH
export const getGoals = async (token) => {
  try {
    const response = await fetch(`${serverUrl}/api/goals`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'error' && data.message === 'Token expired') {
      localStorage.removeItem('token');
      location.href('/');
    }
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    return data;
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

//DELETE GOAL FETCH
export const deleteGoal = async (id, token) => {
  try {
    const response = await fetch(`${serverUrl}/api/goals/delete/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    toast.info(data.message);
    return { ok: true };
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

// COMPLETE GOAL FETCH
export const completeGoal = async (id, token) => {
  try {
    const response = await fetch(`${serverUrl}/api/goals/complete/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    toast.success(data.message);
    return { ok: true };
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};

export const addGoal = async (newGoal, token) => {
  try {
    const response = await fetch(`${serverUrl}/api/goals/add`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newGoal),
    });
    const data = await response.json();
    if (data.status === 'error') {
      return toast.error(data.message);
    }
    toast.info(data.message);
    return { ok: true };
  } catch (err) {
    return toast.error(`An error occurred. ${err.message}`);
  }
};
