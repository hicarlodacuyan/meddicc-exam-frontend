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
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
