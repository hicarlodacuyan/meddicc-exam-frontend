import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be 255 characters or fewer"),
  description: z.string().optional().nullable(),
  completed: z.boolean().default(false),
  due_date: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid datetime format",
    })
    .optional()
    .nullable(),
  completed_date: z
    .string()
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid datetime format",
    })
    .optional()
    .nullable(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  user: z.number().optional().nullable(),
});
