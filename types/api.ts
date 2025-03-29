export type TaskData = {
  name: string;
  description?: string | null;
  completed: boolean;
  due_date?: string | null;
  completed_date?: string | null;
  priority: "low" | "medium" | "high";
  user?: string | null;
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
};
