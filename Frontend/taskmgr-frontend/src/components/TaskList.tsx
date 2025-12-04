import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import { FaRegFrown, FaSpinner } from 'react-icons/fa';

const TaskList: React.FC = () => {
    const { tasks, isLoading, error } = useTasks();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-10 text-indigo-600 dark:text-indigo-400">
                <FaSpinner className="animate-spin text-4xl mr-3" aria-hidden="true" />
                <p className="text-xl font-semibold" aria-live="polite">Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
                <FaRegFrown className="text-4xl mx-auto mb-3" aria-hidden="true" />
                <p className="font-semibold text-lg" aria-atomic="true" aria-live="assertive">Error: Could not retrieve tasks.</p>
                <p className="text-sm italic">{error}</p>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="text-center py-10 bg-gray-50 dark:bg-gray-700 text-gray-500 rounded-lg">
                <p className="text-lg font-semibold">No tasks yet!</p>
                <p className="text-sm">Use the form above to create your first task.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 shadow-xl rounded-lg overflow-hidden border dark:border-gray-700">
            <h2 className="text-2xl font-bold p-4 bg-indigo-600 text-white dark:bg-indigo-800">
                My Tasks ({tasks.length})
            </h2>
            
            <ul className="divide-y divide-gray-200 dark:divide-gray-700" role="list">
                {tasks.map(task => (
                    <li key={task.id}>
                        <TaskItem task={task} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;