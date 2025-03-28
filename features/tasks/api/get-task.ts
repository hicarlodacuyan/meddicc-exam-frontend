"use server";

import apiClient from "@/lib/api-client";

export async function fetchTaskById(id: string) {
  try {
    const response = await apiClient.get(`/tasks/${id}`);

    return {
      message: "Task fetched successfully!",
      task: response.data,
    };
  } catch (error: any) {
    console.error(
      "Error fetching task:",
      error.response?.data || error.message,
    );
    return {
      message: "Failed to fetch task.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  }
}
