import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/features/tasks/api/delete-task";

export function DeleteTask({ id }: { id: string }) {
  const deleteTaskWithId = deleteTask.bind(null, id);

  return (
    <form action={deleteTaskWithId}>
      <Button type="submit" size="icon" variant="destructive">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </Button>
    </form>
  );
}
