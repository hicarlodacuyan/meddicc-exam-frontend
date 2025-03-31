export type Task = {
  id?: number;
  name: string;
  description?: string | null;
  completed: boolean;
  due_date?: string | null;
  completed_date?: string | null;
  priority: "low" | "medium" | "high";
  user?: string | null;
};

export type TaskResponse = {
  results: Task[];
  count: number;
};

export type State = {
  errors?: {
    name?: string[];
    description?: string[];
    completed?: string[];
    due_date?: string[];
    completed_date?: string[];
    priority?: string[];
    user?: string[];
  };
  message?: string | null;
  task?: Task;
};

export type AuthState = {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};
