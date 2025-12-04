import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider, TaskProvider } from './context/TaskContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider> 
      <TaskProvider>
        <App />
      </TaskProvider>
    </ThemeProvider>
  </React.StrictMode>
);