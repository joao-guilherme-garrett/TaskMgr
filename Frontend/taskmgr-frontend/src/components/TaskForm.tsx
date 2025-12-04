import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { FaPlus, FaSpinner } from 'react-icons/fa'; 

const TaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { createTask, isLoading } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
        await createTask({ title: title.trim(), description: description.trim() });
        setTitle('');
        setDescription('');
    } catch (error) {
        console.error("Submission failed.");
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg space-y-4 border-t-4 border-indigo-500"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white"
          aria-level={2}>
          Add New Task
      </h2>

      <div className="space-y-1">
        <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Title
        </label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Implement dark mode"
          required
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          rows={2}
          disabled={isLoading}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>
      
      <button
        type="submit"
        disabled={!title.trim() || isLoading}
        aria-label={isLoading ? "Adding task, please wait" : "Add Task"}
        className={`
          w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
          text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
          disabled:opacity-50 disabled:cursor-not-allowed transition duration-150
        `}
      >
        {isLoading ? (
          <>
            <FaSpinner className="animate-spin mr-2" aria-hidden="true" />
            Adding...
          </>
        ) : (
          <>
            <FaPlus className="mr-2" aria-hidden="true" />
            Add Task
          </>
        )}
      </button>
    </form>
  );
};

export default TaskForm;