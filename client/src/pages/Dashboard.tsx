import { Link, Outlet, useLocation } from "react-router-dom";
import { useGoalsQuery } from "../api/goals";
import Spinner from "../components/ui/Spinner";

const Dashboard = () => {
  const { pathname } = useLocation();
  const { isLoading } = useGoalsQuery();

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
                pathname === "/dashboard/personal"
                  ? `inline-block w-full p-4 focus:outline-none hover:bg-gray-600 rounded-ss-lg bg-gray-600`
                  : `inline-block w-full p-4 focus:outline-none hover:bg-gray-600 rounded-ss-lg`
              }
              to="/dashboard/personal"
            >
              Personal
            </Link>
          </li>
          <li className="w-full rounded-ee-lg">
            <Link
              className={
                pathname === "/dashboard/finance"
                  ? `inline-block w-full p-4 focus:outline-none hover:bg-gray-600 bg-gray-600`
                  : `inline-block w-full p-4 focus:outline-none hover:bg-gray-600`
              }
              to="/dashboard/finance"
            >
              Finance
            </Link>
          </li>
          <li className="w-full">
            <Link
              className={
                pathname === "/dashboard/career"
                  ? `inline-block w-full p-4 focus:outline-none hover:bg-gray-600 rounded-se-lg bg-gray-600`
                  : `inline-block w-full p-4 focus:outline-none hover:bg-gray-600 rounded-se-lg`
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
          {isLoading ? <Spinner /> : <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
