import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addGoal } from '../services/api/goals';
import { SubmitButton } from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import DataContext from '../contexts/DataContext';

const AddGoalPage = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(DataContext);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('personal');
  const [timeFrame, setTimeFrame] = useState('shorterm');

  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();

    const newGoal = {
      title: title,
      category: category,
      timeFrame: timeFrame,
      completed: false,
      userId: user._id,
    };

    const response = await addGoal(newGoal, token);
    setLoading(false);
    if (response.ok) {
      navigate(`/dashboard/${category}`);
    }
  };

  if (loading) {
    return <Spinner loading={loading} size={1} />;
  }

  return (
    <div className="flex flex-col justify-center items-center flex-grow pb-5 px-12">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6" onSubmit={handleAdd}>
          <h1 className="text-xl font-medium text-gray-900 text-center">
            Add a New Goal
          </h1>
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
              placeholder="Enter your goal"
              required={true}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
              name="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            >
              <option value="personal">Personal</option>
              <option value="career">Career</option>
              <option value="finance">Finance</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="timeFrame"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Time Frame
            </label>
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              id="timeFrame"
              name="timeFrame"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5"
            >
              <option value="shorterm">Shorterm</option>
              <option value="longterm">Longterm</option>
            </select>
          </div>
          <SubmitButton text={'Add Goal'} />
          <div className="text-sm font-medium text-gray-500 ">
            <a
              href="/dashboard/personal"
              className="text-violet-700 hover:underline"
            >
              Cancel
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalPage;
