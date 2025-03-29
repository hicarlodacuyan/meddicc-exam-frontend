"use server";

import { revalidatePath } from "next/cache";
import apiClient from "@/lib/api-client";

export async function deleteTask(id: string) {
  try {
    await apiClient.delete(`/tasks/${id}/`);
    console.log(`Task with ID ${id} deleted successfully.`);
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw new Error("Unable to delete task");
  }
}
