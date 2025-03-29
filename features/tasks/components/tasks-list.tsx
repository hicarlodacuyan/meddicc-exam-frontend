import { getTasks } from "@/features/tasks/api/get-tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteTask } from "./delete-task";
import { EditTask } from "./edit-task";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";

type Task = {
  id: number;
  name: string;
  description?: string;
  priority: string;
  completed: boolean;
  due_date?: string;
};

export default async function TasksList() {
  const { tasks } = await getTasks();

  return (
    <div className="mt-6 space-y-4">
      {tasks?.results?.map((task: Task) => (
        <Card key={task.id} className="bg-white shadow-sm">
          <CardHeader className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">{task.name}</CardTitle>
            <div className="space-x-2 flex gap-1">
              <Link href={`/dashboard/${task.id}/edit`}>
                <Button type="submit" size="icon" variant="secondary">
                  <span className="sr-only">Edit</span>
                  <PencilIcon className="w-5" />
                </Button>
              </Link>
              <DeleteTask id={String(task.id)} />
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-gray-700">
                {task.description || "No description"}
              </p>
              <p className="text-gray-500 text-sm">
                Priority: {task.priority} • Status:{" "}
                {task.completed ? "✅ Completed" : "❗ Pending"}
              </p>
              {task.due_date && (
                <p className="text-gray-400 text-xs">
                  Due Date: {new Date(task.due_date).toLocaleString()}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
