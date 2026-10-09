"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/lib/validators/auth";
import { tooManyAttempts, recordFailedAttempt } from "./rate-limit";

export type LoginState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: LoginState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if ((key === "email" || key === "password") && !fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const { email, password } = parsed.data;

  if (await tooManyAttempts(email)) {
    return {
      error: "Too many failed attempts. Please wait 15 minutes and try again.",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      await recordFailedAttempt(email);
      return { error: "Invalid email or password." };
    }
    throw error; // NEXT_REDIRECT on success
  }

  return {};
}
