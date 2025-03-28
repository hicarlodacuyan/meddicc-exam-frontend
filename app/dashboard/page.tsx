import { CreateTask } from "@/features/tasks/components/create-task";
import TasksList from "@/features/tasks/components/tasks-list";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col shrink-0 p-4 bg-blue-500 rounded-lg">
        <CreateTask />
      </div>
      <TasksList />
    </div>
  );
}
