import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import {
  useCompleteGoalMutation,
  useDeleteGoalMutation,
  useGoalsQuery,
} from "../services/api/goals";

type Props = {
  category: string;
  timeframe: string;
};

const DisplayGoals = ({ category, timeframe }: Props) => {
  const [deleteGoal] = useDeleteGoalMutation();
  const [completeGoal] = useCompleteGoalMutation();
  const { data: goals } = useGoalsQuery();

  const filteredGoals = goals?.filter(
    (goal) =>
      goal.category === category.toLowerCase() &&
      goal.timeFrame === timeframe.toLowerCase()
  );

  const handleCompleteGoal = async (id: string) => {
    try {
      await completeGoal(id);
      toast.success("Goal completed, congrats!");
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id);
      toast.info("Goal deleted successfully.");
    } catch {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div className="mt-8 sm:mt-0">
      <p className="text-xl mb-3 font-extrabold tracking-tight text-white">
        {timeframe}
      </p>
      <ul className="overflow-hidden w-50 sm:w-60 text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
        {filteredGoals && filteredGoals.length > 0 ? (
          filteredGoals.map((goal) => (
            <li
              key={goal._id}
              className="w-full border-b rounded-t-lg border-gray-600"
            >
              <div className="flex items-center px-3">
                <input
                  type="checkbox"
                  onChange={() => handleCompleteGoal(goal._id)}
                  className="cursor-pointer text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                />
                <label className="w-full py-3 mx-2 text-sm font-medium text-gray-300">
                  {goal.title}
                </label>
                <button onClick={() => handleDeleteGoal(goal._id)}>
                  <FaTrashCan />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-300 p-2">No goals available.</li>
        )}
      </ul>
    </div>
  );
};

export default DisplayGoals;
