"use server";

import { revalidatePath } from "next/cache";
import apiClient from "@/lib/api-client";
import { State } from "@/types/api";
import { formSchema } from "../lib/task-schema";
import { redirect } from "next/navigation";

export async function editTask(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const taskData = Object.fromEntries(formData);

  if (taskData.user) taskData.user = String(taskData.user);

  const validatedFields = formSchema.safeParse({
    ...taskData,
    completed: taskData.completed === "true",
    user: taskData.user ? Number(taskData.user) : null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Task.",
    };
  }

  try {
    const response = await apiClient.put(`/tasks/${id}/`, validatedFields.data);

    revalidatePath("/dashboard");

    return {
      message: "Task updated successfully!",
      task: response.data,
    };
  } catch (error: any) {
    console.error(
      "Error updating task:",
      error.response?.data || error.message,
    );
    return {
      message: "Failed to update task.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  } finally {
    redirect("/dashboard");
  }
}
