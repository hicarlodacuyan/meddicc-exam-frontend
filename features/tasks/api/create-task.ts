"use server";

import { revalidatePath } from "next/cache";
import { formSchema } from "../lib/task-schema";
import { State } from "@/types/api";
import apiClient from "@/lib/api-client";

export async function createTask(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const taskData = Object.fromEntries(formData);
  taskData.completed = taskData.completed === "on" ? "true" : "false";

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
    const response = await apiClient.post("/tasks/", validatedFields.data);

    revalidatePath("/dashboard");

    return {
      message: "Task created successfully!",
      task: response.data,
    };
  } catch (error: any) {
    console.error(
      "Error creating task:",
      error.response?.data || error.message,
    );
    return {
      message: "Failed to create task.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  }
}
