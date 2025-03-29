import { getTasks } from "@/features/tasks/api/get-tasks";
import { CreateTask } from "@/features/tasks/components/create-task";
import { PaginationWithLinks } from "@/features/tasks/components/pagination-with-links";
import Search from "@/features/tasks/components/search";
import TasksList from "@/features/tasks/components/tasks-list";

export default async function Page(props: {
  searchParams?: Promise<{
    page?: string;
    page_size?: string;
    name?: string;
    completed?: string;
    due_date_start?: string;
    due_date_end?: string;
    priority?: string;
    user?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const currentPageSize = Number(searchParams?.page_size) || 5;

  const filters = {
    name: searchParams?.name || undefined,
    completed:
      searchParams?.completed !== undefined
        ? searchParams?.completed === "true"
        : undefined,
    due_date_start: searchParams?.due_date_start || undefined,
    due_date_end: searchParams?.due_date_end || undefined,
    priority: searchParams?.priority || undefined,
    user: searchParams?.user ? Number(searchParams?.user) : undefined,
  };

  const { tasks } = await getTasks(currentPage, currentPageSize, filters);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col shrink-0 p-4 bg-blue-500 rounded-lg">
        <CreateTask />
      </div>
      <div className="flex flex-col gap-4">
        <Search placeholder="Search tasks..." />
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
