import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
// Pages
import MainLayout from "./layouts/MainLayout";
import AddGoalPage from "./pages/AddGoalPage";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
// Components
import { CareerTab, FinanceTab, PersonalTab } from "./components/TabContent";
// Utils
import EnsureAuth from "./utils/EnsureAuth";
import EnsureGuest from "./utils/EnsureGuest";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route element={<EnsureGuest />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route element={<EnsureAuth />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard/personal" element={<PersonalTab />} />
            <Route path="/dashboard/finance" element={<FinanceTab />} />
            <Route path="/dashboard/career" element={<CareerTab />} />
          </Route>
          <Route path="/add-goal" element={<AddGoalPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
