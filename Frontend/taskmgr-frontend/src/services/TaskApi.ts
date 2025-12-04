import type { Task, NewTaskPayload } from '../types/Task';

const API_BASE_URL = 'http://localhost:5000/api/tasks'; 

export const TaskApi = {
  // READ ALL (GET)
  getTasks: async (): Promise<Task[]> => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    return response.json();
  },

  // CREATE (POST)
  createTask: async (payload: NewTaskPayload): Promise<Task> => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.status !== 201) {
      const errorData = await response.json();
      throw new Error(`Failed to create task: ${errorData.Error || response.statusText}`);
    }
    return response.json(); 
  },

  // UPDATE (PUT)
  updateTaskStatus: async (id: number, updatedTask: Partial<Task>): Promise<void> => {
    
    const payload = {
      title: updatedTask.title,
      description: updatedTask.description,
      isCompleted: updatedTask.isCompleted,
    };

    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (response.status !== 204) {
      const errorData = await response.json();
      throw new Error(`Failed to update task ${id}: ${errorData.Error || response.statusText}`);
    }
  },
  
  // DELETE (DELETE)
  deleteTask: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (response.status !== 204) {
      const errorData = await response.json();
      throw new Error(`Failed to delete task ${id}: ${errorData.Error || response.statusText}`);
    }
  }
};