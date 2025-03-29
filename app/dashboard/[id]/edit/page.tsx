import { fetchTaskById } from "@/features/tasks/api/get-task";
import { EditTask } from "@/features/tasks/components/edit-task";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const { task } = await fetchTaskById(id);

  if (!task) {
    notFound();
  }

  return (
    <div className="bg-blue-500 rounded-lg p-4">
      <EditTask task={task} />
    </div>
  );
}
