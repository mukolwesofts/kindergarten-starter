import { z } from "zod";
import { userRoles } from "@/features/users/schema";

export const emailField = z
  .email("Enter a valid email address.")
  .transform((v) => v.trim().toLowerCase());

export const createUserSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: emailField,
  role: z.enum(userRoles),
  password: z
    .string()
    .min(10, "Temporary password must be at least 10 characters."),
});

export const updateUserSchema = z.object({
  id: z.coerce.number().int().positive(),
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  role: z.enum(userRoles),
  active: z.coerce.boolean(),
});

export const resetPasswordSchema = z.object({
  id: z.coerce.number().int().positive(),
  password: z.string().min(10, "New password must be at least 10 characters."),
});

export const deleteUserSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
