import { RegisterForm } from "@/features/auth/components/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

export default function Page() {
  return <RegisterForm />;
}
