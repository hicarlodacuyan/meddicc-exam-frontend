import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeleteTask } from "./delete-task";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { getTasks } from "../api/get-tasks";

export default async function TasksList({
  currentPage,
  currentPageSize,
  filters,
}: {
  currentPage: number;
  currentPageSize: number;
  filters: any;
}) {
  const { tasks } = await getTasks(currentPage, currentPageSize, filters);

  return (
    <div className="space-y-4">
      {tasks?.results?.map((task) => (
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
              <p className="text-gray-500 text-sm">Priority: {task.priority}</p>
              <p className="text-gray-500 text-sm">
                Status: {task.completed ? "✅ completed" : "❗ pending"}
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
