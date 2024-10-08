import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';

const DisplayGoals = ( { category, timeframe } ) => {
    
    const { goals, handleDeleteGoal, handleCompleteGoal } = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();

    let filteredGoals = []
    if(Array.isArray(goals)){
        filteredGoals = goals.filter((goal) => goal.category === category.toLowerCase() && goal.timeFrame === timeframe.toLowerCase())
    }

    return (
        <div className='mt-8 sm:mt-0'>
            <p className="text-xl mb-3 font-extrabold tracking-tight text-white">
                { timeframe }
            </p>
            <ul className="w-60 text-sm font-medium border rounded-lg bg-gray-700 border-gray-600 text-white">
            {Array.isArray(filteredGoals) && filteredGoals.length > 0 ? (
                    filteredGoals.map(goal => (
                        <li key={goal._id} className="w-full border-b rounded-t-lg border-gray-600">
                            <div className="flex items-center px-3">
                                <input
                                    type="checkbox"
                                    onChange={() => handleCompleteGoal(goal._id)}
                                    className="cursor-pointer text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
                                />
                                <label className="w-full py-3 ms-2 text-sm font-medium text-gray-300">
                                    {goal.title}
                                </label>
                                <button onClick={() => handleDeleteGoal(goal._id)}>
                                    <i className="fa-solid fa-delete-left" />
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-300">No goals available.</li>
                )}
            </ul>
        </div>
    )
}

export default DisplayGoals