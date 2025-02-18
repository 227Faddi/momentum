import { motion } from "motion/react";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  useCompleteGoalMutation,
  useDeleteGoalMutation,
  useGoalsQuery,
} from "../api/goals";

type Props = {
  category: string;
  timeframe: string;
};

const DisplayGoals = ({ category, timeframe }: Props) => {
  const [deleteGoal] = useDeleteGoalMutation();
  const [completeGoal] = useCompleteGoalMutation();
  const { data: goals, isError } = useGoalsQuery();

  const filteredGoals = goals?.filter(
    (goal) =>
      goal.category === category.toLowerCase() &&
      goal.timeFrame === timeframe.toLowerCase()
  );

  const handleCompleteGoal = async (id: string) => {
    try {
      const result = await completeGoal(id);
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      toast.success("Goal completed, congrats!");
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      const result = await deleteGoal(id);
      if (result.error) {
        return toast.error("An error occurred. Please try again.");
      }
      toast.info("Goal deleted successfully.");
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  if (isError) {
    return <div className="text-white">Error</div>;
  }

  return (
    <div className="mt-8 sm:mt-0 w-full p-2 sm:p-4 md:p-8">
      <p className="text-xl mb-3 font-extrabold tracking-tight text-white">
        {timeframe}
      </p>
      <ul className="overflow-hidden text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
        {filteredGoals && filteredGoals.length > 0 ? (
          filteredGoals.map((goal, index) => (
            <motion.li
              initial={{ opacity: 0, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              key={goal._id}
              className="w-full border-b rounded-t-lg border-gray-600"
            >
              <div className="flex items-center px-3">
                <input
                  type="checkbox"
                  onChange={() => handleCompleteGoal(goal._id!)}
                  className="cursor-pointer text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                />
                <label className="w-full py-3 mx-2 text-sm font-medium text-gray-300">
                  {goal.title}
                </label>
                <button
                  onClick={() => handleDeleteGoal(goal._id!)}
                  className="cursor-pointer"
                >
                  <FaTrashCan />
                </button>
              </div>
            </motion.li>
          ))
        ) : (
          <li className="text-gray-300 p-2">No goals available.</li>
        )}
      </ul>
    </div>
  );
};

export default DisplayGoals;
