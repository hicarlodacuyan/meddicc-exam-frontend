"use client";

import { State, Task } from "@/types/api";
import { editTask } from "../api/edit-task";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";

export function EditTask({ task }: { task: Task }) {
  const taskId = String(task.id);
  const initialState: State = { message: null, errors: {} };
  const editTaskWithId = editTask.bind(null, taskId);
  const [state, formAction] = useActionState(editTaskWithId, initialState);
  const [isChecked, setIsChecked] = useState(task.completed);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Task Name</label>
        <Input
          defaultValue={task.name}
          name="name"
          placeholder="e.g. Buy groceries"
          className="h-12"
          aria-describedby="task-error"
        />

        <div id="task-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <Textarea
          defaultValue={task.description ?? ""}
          name="description"
          placeholder="Fruits, vegetables, meats, etc."
        />
      </div>

      <div className="flex gap-4 items-start flex-wrap">
        <div>
          <label className="block text-sm font-medium">Priority</label>
          <Select name="priority" defaultValue={task.priority}>
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium">Due Date</label>
          <Input
            defaultValue={
              task.due_date
                ? new Date(task.due_date).toISOString().slice(0, 16) // Get the yyyy-MM-ddThh:mm format
                : ""
            }
            type="datetime-local"
            name="due_date"
            aria-describedby="due_date-error"
          />
          <div id="due_date-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.due_date &&
              state.errors.due_date.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="text-sm font-medium">Completed</label>
          <input
            type="hidden"
            name="completed"
            value={isChecked ? "true" : "false"}
          />
          <Checkbox
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(!!checked)}
          />
        </div>
      </div>

      <Button type="submit">Update Task</Button>
    </form>
  );
}
