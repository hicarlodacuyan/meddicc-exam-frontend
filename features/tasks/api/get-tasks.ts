"use server";

import apiClient from "@/lib/api-client";

export async function getTasks(page = 1, pageSize = 5) {
  try {
    const response = await apiClient.get(
      `/tasks/?page=${page}&page_size=${pageSize}`,
    );

    return {
      message: "Tasks fetched successfully!",
      tasks: response.data,
    };
  } catch (error: any) {
    console.error(
      "Error fetching tasks:",
      error.response?.data || error.message,
    );
    return {
      message: "Failed to fetch tasks.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  }
}
