"use server";

import { redirect } from "next/navigation";
import { State } from "@/types/api";
import apiClient from "@/lib/api-client";
import { cookies } from "next/headers";

export async function register(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const { username, email, password } = Object.fromEntries(formData);
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");

  try {
    const response = await apiClient.post("/register/", {
      username,
      email,
      password,
    });
  } catch (error: any) {
    return {
      message: "Failed to register.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  }

  redirect("/login");
}
