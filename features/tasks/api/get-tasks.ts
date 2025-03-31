"use server";

import apiClient from "@/lib/api-client";
import { TaskResponse } from "@/types/api";

type TaskFilters = {
  name?: string;
  completed?: boolean;
  due_date_start?: string;
  due_date_end?: string;
  priority?: string;
  user?: number;
};

export async function getTasks(
  page = 1,
  pageSize = 5,
  filters: TaskFilters = {},
): Promise<{ message: string; tasks: TaskResponse }> {
  try {
    let url = `/tasks/?page=${page}&page_size=${pageSize}`;

    // Append filters to the URL if present
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url += `&${key}=${encodeURIComponent(value)}`;
      }
    });

    const response = await apiClient.get(url);

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
      message: "Error fetching tasks.",
      tasks: { results: [], count: 0 },
    };
  }
}
