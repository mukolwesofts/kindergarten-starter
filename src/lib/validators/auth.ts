import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Enter a valid email address.")
    .transform((v) => v.trim().toLowerCase()),
  password: z.string().min(1, "Enter your password."),
});

export type LoginInput = z.infer<typeof loginSchema>;
