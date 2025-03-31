import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTask } from "../create-task";

test("renders create task form", () => {
  render(<CreateTask />);
  expect(screen.getByText(/create task/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/task name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
  expect(screen.getByText(/completed/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /create task/i }),
  ).toBeInTheDocument();
});

test("allows the user to enter task details", async () => {
  render(<CreateTask />);

  const nameInput = screen.getByLabelText(/task name/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const dueDateInput = screen.getByLabelText(/due date/i);
  const completedCheckbox = screen.getByLabelText(/completed/i);

  // Fill the text inputs
  await userEvent.type(nameInput, "Finish Homework");
  await userEvent.type(
    descriptionInput,
    "Complete math and science assignments",
  );
  await userEvent.type(dueDateInput, "2025-04-01T10:00");
  await userEvent.click(completedCheckbox);

  // Open the select dropdown
  const priorityTrigger = screen.getByRole("combobox", { name: /priority/i });
  await userEvent.click(priorityTrigger);

  // Select the "high" option
  const highOption = await screen.findByText(/high/i);
  await userEvent.click(highOption);

  // Check that the selected value is now "high"
  expect(screen.getByText(/high/i)).toBeInTheDocument();

  // Assertions
  expect(nameInput).toHaveValue("Finish Homework");
  expect(descriptionInput).toHaveValue("Complete math and science assignments");
  expect(dueDateInput).toHaveValue("2025-04-01T10:00");
  expect(completedCheckbox).toBeChecked();
});

test("submits the form with valid data", async () => {
  render(<CreateTask />);

  const nameInput = screen.getByLabelText(/task name/i);
  const descriptionInput = screen.getByLabelText(/description/i);
  const prioritySelect = screen.getByLabelText(/priority/i);
  const dueDateInput = screen.getByLabelText(/due date/i);
  const completedCheckbox = screen.getByLabelText(/completed/i);
  const submitButton = screen.getByRole("button", { name: /create task/i });

  await userEvent.type(nameInput, "Finish Homework");
  await userEvent.type(
    descriptionInput,
    "Complete math and science assignments",
  );

  // Open the priority select dropdown and choose "High"
  await userEvent.click(prioritySelect);
  const highPriorityOption = await screen.findByText(/high/i);
  await userEvent.click(highPriorityOption);

  await userEvent.type(dueDateInput, "2025-04-01T10:00");
  await userEvent.click(completedCheckbox);
  await userEvent.click(submitButton);

  // Check that the form fields are cleared after submission
  await waitFor(() => {
    expect(nameInput).toHaveValue("");
    expect(descriptionInput).toHaveValue("");
    expect(prioritySelect).toHaveTextContent("Medium"); // Check if it reverted to the default value
    expect(dueDateInput).toHaveValue("");
    expect(completedCheckbox).not.toBeChecked();
  });
});

test("does not submit with empty fields and shows validation errors", async () => {
  render(<CreateTask />);
  const submitButton = screen.getByRole("button", { name: /create task/i });

  await userEvent.click(submitButton);

  // Check for validation error messages
  await waitFor(() => {
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/invalid datetime format/i)).toBeInTheDocument();
  });
});
