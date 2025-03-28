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

      return {
        message: "Login successful!",
        token: access,
      };
    }

    return {
      message: "Invalid credentials.",
      errors: { general: ["Invalid email or password."] },
    };
  } catch (error: any) {
    console.error("Error during login:", error.response?.data || error.message);
    return {
      message: "Failed to login.",
      errors: error.response?.data || { general: ["An error occurred"] },
    };
  } finally {
    redirect("/dashboard");
  }
}
