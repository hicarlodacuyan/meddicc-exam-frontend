"use server";

import { redirect } from "next/navigation";
import { State } from "@/types/api";
import apiClient from "@/lib/api-client";
import { cookies } from "next/headers";

export async function login(prevState: State, formData: FormData) {
  const { username, password } = Object.fromEntries(formData);

  try {
    const response = await apiClient.post("/login/", { username, password });

    const { access } = response.data || {};

    if (access) {
      const cookieStore = await cookies();
      cookieStore.set("accessToken", access, { secure: true });
    }
  } catch (error: any) {
    return {
      message: "Failed to login.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  }

  redirect("/dashboard");
}
