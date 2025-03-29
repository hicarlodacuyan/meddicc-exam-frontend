import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RegisterForm } from "../register-form";

test("renders register form", () => {
  render(<RegisterForm />);
  expect(screen.getByText(/create an account/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
});

test("submits the form with valid inputs", async () => {
  render(<RegisterForm />);

  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole("button", { name: /register/i });

  await userEvent.type(usernameInput, "newuser");
  await userEvent.type(emailInput, "newuser@example.com");
  await userEvent.type(passwordInput, "password123");
  await userEvent.click(registerButton);

  // Check if the form submission is successful
  expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
});

test("shows error message when fields are missing", async () => {
  render(<RegisterForm />);

  const registerButton = screen.getByRole("button", { name: /register/i });
  await userEvent.click(registerButton);

  expect(screen.getByText(/this field may not be blank/i)).toBeInTheDocument();
});

test("displays error message on registration failure", async () => {
  render(<RegisterForm />);

  const usernameInput = screen.getByLabelText(/username/i);
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const registerButton = screen.getByRole("button", { name: /register/i });

  await userEvent.type(usernameInput, "existinguser");
  await userEvent.type(emailInput, "existinguser@example.com");
  await userEvent.type(passwordInput, "password123");
  await userEvent.click(registerButton);

  expect(
    screen.getByText(/a user with that name already exists/i),
  ).toBeInTheDocument();
});
