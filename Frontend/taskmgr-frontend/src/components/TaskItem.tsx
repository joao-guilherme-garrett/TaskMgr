import React, { useMemo } from 'react';
import type { Task } from '../types/Task';
import { useTasks } from '../context/TaskContext';
import { FaCheck, FaTrash, FaRegCircle } from 'react-icons/fa';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = React.memo(({ task }) => {
  const { toggleCompletion, deleteTask, isLoading } = useTasks();

  const handleToggle = () => {
    toggleCompletion(task);
  };
  
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
        deleteTask(task.id);
    }
  };
  
  const itemClasses = useMemo(() => `
      flex items-center justify-between p-4 transition duration-200 ease-in-out
      ${task.isCompleted 
          ? 'bg-green-50 dark:bg-gray-700 opacity-80' 
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750'}
  `, [task.isCompleted]);
  
  const titleClasses = useMemo(() => `
      text-lg font-medium flex-1 mr-4
      ${task.isCompleted 
          ? 'line-through text-gray-500 dark:text-gray-400' 
          : 'text-gray-900 dark:text-gray-100'}
  `, [task.isCompleted]);

  return (
    <div className={itemClasses} aria-label={`Task: ${task.title}, Status: ${task.isCompleted ? 'Completed' : 'Pending'}`}>
      
      <div className='flex-1 min-w-0'>
        <span className={titleClasses}>
          {task.title}
        </span>
        <p className='text-sm text-gray-400 dark:text-gray-500 truncate'>
          {task.description || 'No description provided.'}
        </p>
      </div>

      <div className='flex space-x-2 ml-4'>
        <button
          onClick={handleToggle}
          disabled={isLoading}
          aria-label={task.isCompleted ? "Mark as incomplete" : "Mark as complete"}
          className={`
            p-2 rounded-full transition duration-150 focus:ring-2 focus:ring-offset-2 
            ${task.isCompleted 
               ? 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500' 
               : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 focus:ring-gray-400'}
            disabled:opacity-50
          `}
        >
          {task.isCompleted ? <FaCheck size={16} aria-hidden="true" /> : <FaRegCircle size={16} aria-hidden="true" />}
        </button>
        
        <button
          onClick={handleDelete}
          disabled={isLoading}
          aria-label="Delete task"
          className='p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:ring-2 focus:ring-red-500 disabled:opacity-50'
        >
          <FaTrash size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

export default TaskItem;