import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, useNavigate, useLocation, redirect } from 'react-router-dom';
import { useEffect, useState } from 'react'
// Pages
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import AddGoalPage from './pages/AddGoalPage';
import NotFoundPage from './pages/NotFoundPage';
// Components
import { FinanceTab } from './components/TabContent';
import { PersonalTab } from './components/TabContent';
import { CareerTab } from './components/TabContent';
// Utils
import EnsureAuth from './utils/EnsureAuth';
import EnsureGuest from './utils/EnsureGuest';

function App() { 
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null))
  const [token, setToken] = useState(localStorage.getItem('token') || null)

  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={ <MainLayout user={user} setUser={setUser} serverUrl={serverUrl} token={token} setToken={setToken} /> } >
        <Route element={ <EnsureGuest/> }>
          <Route path='/' element={ <HomePage /> } />
          <Route path='/login' element={ <LoginPage /> } />
          <Route path='/signup' element={ <SignUpPage /> } />
        </Route>
        <Route element={ <EnsureAuth/> }>
          <Route path='/dashboard' element={ <Dashboard /> }>
            <Route path='/dashboard/personal' element={ <PersonalTab /> } />
            <Route path='/dashboard/finance' element={ <FinanceTab /> } />
            <Route path='/dashboard/career' element={ <CareerTab /> } />
          </Route>
          <Route path='/add-goal' element={ <AddGoalPage/> } />
        </Route>
        <Route path='*' element={ <NotFoundPage /> } />
      </Route>
    )
  );
  return <RouterProvider router={router} />
}

export default App
