export interface Task {
  id: number;
  title: string;
  description: string; 
  isCompleted: boolean;
  createdAt: string;
}

export interface NewTaskPayload {
  title: string;
  description: string;
}

export interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (payload: NewTaskPayload) => Promise<void>;
  toggleCompletion: (task: Task) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}