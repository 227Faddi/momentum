import { motion } from "motion/react";
import { FaFire } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLeaderboardQuery } from "../api/goals";
import Spinner from "../components/ui/Spinner";
import { selectCurrentUser } from "../state/authSlice";

const LeaderboardPage = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { data: users, isLoading } = useLeaderboardQuery();

  return (
    <div className="flex flex-col justify-center items-center flex-grow pb-5 px-12">
      <div className="p-4 rounded-lg sm:p-8">
        <h2 className="mb-5 text-2xl text-gray-600 font-extrabold tracking-tight text-center">
          Leaderboard
        </h2>
        {isLoading ? (
          <Spinner />
        ) : users ? (
          <ul className="sm:text-lg font-medium border rounded-lg bg-gray-600 border-gray-600 text-white p-5 sm:space-y-2">
            {users.length > 0 ? (
              users.map((user, index) => (
                <motion.li
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  viewport={{ once: true }}
                  key={user?._id}
                  className={`w-full border-b last:border-b-0 border-gray-600 flex justify-between px-3 py-2 space-x-6`}
                >
                  <span
                    className={
                      currentUser?.email === user?.email
                        ? "text-white"
                        : "text-gray-300"
                    }
                  >
                    {index + 1}. {user?.username}
                  </span>
                  <span
                    className={`text-gray-300 font-bold flex items-center gap-1 + ${
                      currentUser?.email === user?.email
                        ? "text-white"
                        : "text-gray-300"
                    }`}
                  >
                    {user?.points} <FaFire />
                  </span>
                </motion.li>
              ))
            ) : (
              <li className="text-gray-300 p-3 text-center">
                No Users available.
              </li>
            )}
          </ul>
        ) : (
          <div>Error</div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
