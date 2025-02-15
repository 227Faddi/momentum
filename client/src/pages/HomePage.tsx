import { LuChartNoAxesColumn, LuCircleCheckBig, LuGoal } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../api/auth";
import FeatureCard from "../components/ui/FeatureCard";
import { setTokens } from "../state/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const guest = {
    email: import.meta.env.VITE_GUEST_EMAIL,
    password: import.meta.env.VITE_GUEST_PASSWORD,
  };

  const handleLogin = async () => {
    try {
      const result = await login(guest);
      dispatch(
        setTokens({
          accessToken: result.data?.accessToken,
          refreshToken: result.data?.refreshToken,
        })
      );
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      navigate("/dashboard/personal");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center space-y-6 py-16 md:py-48 px-4">
      <section className="flex flex-col items-center justify-center">
        <div className="space-y-2 max-w-2xl text-center">
          <h1 className="text-4xl sm:text-6xl">
            Your Simple <span className="text-nowrap">Goal-Tracking</span>{" "}
            Platform
          </h1>
          <p className="text-gray-500 text-xl">
            Set goals, track progress, and earn rewards for every milestone you
            achieve. Start planning today and turn your goals into reality.
          </p>
        </div>
        <div className="mt-16">
          <button
            className="cursor-pointer text-white bg-gradient-to-r from-gray-400 via-gray-600 to-gray-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 shadow-lg shadow-gray-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
            onClick={handleLogin}
          >
            {isLoading ? "Loading..." : "Try as a Guest"}
          </button>
          <div className="w-full py-3 flex items-center text-gray-400 before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6">
            or
          </div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 shadow-lg shadow-purple-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-indigo-300 shadow-lg shadow-indigo-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Signup
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center gap-12 pt-24 max-w-5xl">
        <div className="p-8 text-center max-w-xl">
          <h2 className="text-2xl sm:text-3xl text">
            Why Momentum Works for You
          </h2>
          <p className="mt-6 text-lg font-light text-gray-500">
            Momentum helps you stay organized, focused, and motivated. It’s the
            simple, effective way to turn your plans into action.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <FeatureCard
            icon={<LuGoal size={25} />}
            title="Goal Setting Made Simple"
            text="Define your goals with ease, whether they’re daily, short-term, or long-term, across 3 categories: Personal, Finance, and Career."
          />
          <FeatureCard
            icon={<LuCircleCheckBig size={25} />}
            title="Earn Points & Stay Motivated"
            text="Get rewarded with points for every milestone you achieve.
              Celebrate your wins and keep the momentum going!"
          />
          <FeatureCard
            icon={<LuChartNoAxesColumn size={25} />}
            title="Leaderboard: Compete & Inspire"
            text="Climb the ranks on our global leaderboard. See how you stack up
              against others, and let a little friendly competition fuel your
              drive."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
