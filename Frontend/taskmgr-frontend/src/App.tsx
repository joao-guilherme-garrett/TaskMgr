import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTheme } from './context/TaskContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto p-4 md:p-8 max-w-2xl">
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            Task Manager
          </h1>
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </header>
        
        <main>
          <TaskForm />
          <TaskList />
        </main>

      </div>
    </div>
  );
};

export default App;