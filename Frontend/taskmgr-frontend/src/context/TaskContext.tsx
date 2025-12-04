import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Task, NewTaskPayload, TaskContextType } from '../types/Task';
import { TaskApi } from '../services/TaskApi';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
      setIsLoading(true);
      setError(null);
      try {
          const data = await TaskApi.getTasks();
          setTasks(data.reverse());
      } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to load tasks.';
          setError(message);
      } finally {
          setIsLoading(false);
      }
  }, []); 

  useEffect(() => {
      fetchTasks();
  }, [fetchTasks]); 

  const createTask = useCallback(async (payload: NewTaskPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await TaskApi.createTask(payload);
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error during task creation.';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleCompletion = useCallback(async (task: Task) => {
    const updatedStatus = !task.isCompleted;
    setTasks(prevTasks => prevTasks.map(t => 
      t.id === task.id ? { ...t, isCompleted: updatedStatus } : t
    ));

    try {
      const payloadToSend = {
          title: task.title,
          description: task.description,
          isCompleted: updatedStatus
      };
      await TaskApi.updateTaskStatus(task.id, payloadToSend);
    } catch (err) {
      console.error(err);
      setTasks(prevTasks => prevTasks.map(t => 
          t.id === task.id ? { ...t, isCompleted: !updatedStatus } : t
      ));
      setError('Failed to toggle completion status.');
    }
  }, []);
  
  const deleteTask = useCallback(async (id: number) => {

    setTasks(prevTasks => prevTasks.filter(t => t.id !== id));
    
    try {
      await TaskApi.deleteTask(id);
    } catch (err) {
      console.error(err);
      setError('Failed to delete task. List is being refreshed.');
      fetchTasks(); 
    }
  }, [fetchTasks]);

  const contextValue: TaskContextType = {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    toggleCompletion,
    deleteTask,
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
};

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    const toggleTheme = useCallback(() => {
        setIsDarkMode(prev => {
            const newMode = !prev;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    }, []);

    useEffect(() => {
        const html = document.documentElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};