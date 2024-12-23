import { useState, useEffect, useContext } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { getGoals, deleteGoal, completeGoal } from '../services/api/goals';
import DataContext from '../contexts/DataContext';
import Spinner from '../components/ui/Spinner';

const Dashboard = () => {
  const { setUser, token } = useContext(DataContext);

  const location = useLocation();
  const path = location.pathname;
  let tabClass = `inline-block w-full p-4 focus:outline-none hover:bg-gray-600`;

  // GET GOAL FETCH
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      setGoals(await getGoals(token));
      setLoading(false);
    };
    fetchGoals();
  }, [token, setGoals]);

  // DELETE GOAL FETCH
  const handleDeleteGoal = async (id) => {
    const response = await deleteGoal(id, token);
    if (response.ok) {
      setGoals((g) => g.filter((goal) => goal._id !== id));
    }
  };

  // COMPLETE GOAL FETCH
  const handleCompleteGoal = async (id) => {
    const response = await completeGoal(id, token);
    if (response.ok) {
      setGoals((g) => g.filter((goal) => goal._id !== id));
      setUser((u) => ({ ...u, points: u.points + 10 }));
    }
  };

  return (
    <div className="overflow-hidden text-center my-5 flex flex-col items-center flex-grow pb-10 px-12">
      <div className="lg:w-3/5 mt-5 w-full border rounded-lg shadow bg-gray-800 border-gray-700 opacity-80">
        <ul
          className="text-sm font-medium text-center divide-x rounded-lg sm:flex divide-gray-600 text-white rtl:divide-x-reverse"
          id="fullWidthTab"
          data-tabs-toggle="#fullWidthTabContent"
          role="tablist"
        >
          <li className="w-full">
            <Link
              className={
                path === '/dashboard/personal'
                  ? `${tabClass} rounded-ss-lg bg-gray-600`
                  : `${tabClass} rounded-ss-lg`
              }
              to="/dashboard/personal"
            >
              Personal
            </Link>
          </li>
          <li className="w-full rounded-ee-lg">
            <Link
              className={
                path === '/dashboard/finance'
                  ? `${tabClass} bg-gray-600`
                  : `${tabClass}`
              }
              to="/dashboard/finance"
            >
              Finance
            </Link>
          </li>
          <li className="w-full">
            <Link
              className={
                path === '/dashboard/career'
                  ? `${tabClass} rounded-se-lg bg-gray-600`
                  : `${tabClass} rounded-se-lg`
              }
              to="/dashboard/career"
            >
              Career
            </Link>
          </li>
        </ul>
        <div
          id="fullWidthTabContent"
          className="border-t border-gray-600 min-h-96"
        >
          {loading ? (
            <Spinner loading={loading} size={450} />
          ) : (
            <Outlet context={{ goals, handleDeleteGoal, handleCompleteGoal }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
