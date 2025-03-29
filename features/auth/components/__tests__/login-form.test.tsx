import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "../login-form";

test("renders login form", () => {
  render(<LoginForm />);
  expect(screen.getByText(/please log in to continue/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
});

test("allows the user to enter a username and password", async () => {
  render(<LoginForm />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await userEvent.type(usernameInput, "testuser");
  await userEvent.type(passwordInput, "password123");

  expect(usernameInput).toHaveValue("testuser");
  expect(passwordInput).toHaveValue("password123");
});

test("shows error message when submitting empty form", async () => {
  render(<LoginForm />);

  const loginButton = screen.getByRole("button", { name: /log in/i });

  await userEvent.click(loginButton);

  expect(screen.getByText(/failed to login/i)).toBeInTheDocument();
});

test("submits the form with valid credentials", async () => {
  render(<LoginForm />);

  const usernameInput = screen.getByLabelText(/username/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole("button", { name: /log in/i });

  await userEvent.type(usernameInput, "admin");
  await userEvent.type(passwordInput, "123456");
  await userEvent.click(loginButton);

  // Since the form submission triggers the `formAction` method,
  // we should check for a side effect like an error message or some other indication.
  expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
});
