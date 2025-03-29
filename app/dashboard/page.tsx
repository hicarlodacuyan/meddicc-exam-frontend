import { getTasks } from "@/features/tasks/api/get-tasks";
import { CreateTask } from "@/features/tasks/components/create-task";
import { PaginationWithLinks } from "@/features/tasks/components/pagination-with-links";
import TasksList from "@/features/tasks/components/tasks-list";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    page_size?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const currentPageSize = Number(searchParams?.page_size) || 5;

  const { tasks } = await getTasks(currentPage, currentPageSize);

  return (
    <div>
      <div className="flex flex-col shrink-0 p-4 bg-blue-500 rounded-lg">
        <CreateTask />
      </div>
      <div className="flex flex-col gap-4">
        <TasksList tasks={tasks.results} />
        <PaginationWithLinks
          page={currentPage}
          pageSize={currentPageSize}
          totalCount={tasks.count}
        />
      </div>
    </div>
  );
}
