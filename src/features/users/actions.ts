"use server";

import "server-only";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, now } from "./schema";
import { getSessionUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import {
  createUserSchema,
  updateUserSchema,
  resetPasswordSchema,
  deleteUserSchema,
} from "@/lib/validators/user";
import { countActiveAdmins } from "./queries";
import type { ZodError } from "zod";

export type ActionResult = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

function flatten(error: ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}

async function requireUserAdmin() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) return { error: "You must be signed in." } as const;
  if (!can(sessionUser, "manage", "user")) {
    return { error: "Only admins can manage users." } as const;
  }
  return { sessionUser } as const;
}

export async function createUser(input: unknown): Promise<ActionResult> {
  const authz = await requireUserAdmin();
  if ("error" in authz) return { ok: false, error: authz.error };

  const parsed = createUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: flatten(parsed.error) };
  }

  const { name, email, role, password } = parsed.data;

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email));
  if (existing.length > 0) {
    return {
      ok: false,
      fieldErrors: { email: "A user with this email already exists." },
    };
  }

  const ts = now();
  await db.insert(users).values({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 12),
    role,
    active: true,
    createdAt: ts,
    updatedAt: ts,
  });

  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function updateUser(input: unknown): Promise<ActionResult> {
  const authz = await requireUserAdmin();
  if ("error" in authz) return { ok: false, error: authz.error };
  const me = authz.sessionUser;

  const parsed = updateUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: flatten(parsed.error) };
  }
  const { id, name, role, active } = parsed.data;

  const [target] = await db.select().from(users).where(eq(users.id, id));
  if (!target) return { ok: false, error: "User not found." };

  const isSelf = target.id === Number(me.id);

  // Rule: you cannot deactivate yourself or demote yourself out of admin.
  if (isSelf && !active) {
    return { ok: false, error: "You cannot deactivate your own account." };
  }
  if (isSelf && target.role === "admin" && role !== "admin") {
    return { ok: false, error: "You cannot demote your own admin account." };
  }

  // Rule: never remove the last active admin.
  const losesAdmin =
    target.role === "admin" && target.active && (!active || role !== "admin");
  if (losesAdmin) {
    const remaining = await countActiveAdmins(target.id);
    if (remaining === 0) {
      return {
        ok: false,
        error: "This is the last active admin — promote another admin first.",
      };
    }
  }

  await db
    .update(users)
    .set({ name, role, active, updatedAt: now() })
    .where(eq(users.id, id));

  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function resetPassword(input: unknown): Promise<ActionResult> {
  const authz = await requireUserAdmin();
  if ("error" in authz) return { ok: false, error: authz.error };

  const parsed = resetPasswordSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: flatten(parsed.error) };
  }
  const { id, password } = parsed.data;

  const [target] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, id));
  if (!target) return { ok: false, error: "User not found." };

  await db
    .update(users)
    .set({ passwordHash: await bcrypt.hash(password, 12), updatedAt: now() })
    .where(eq(users.id, id));

  revalidatePath("/dashboard/users");
  return { ok: true };
}

export async function deleteUser(input: unknown): Promise<ActionResult> {
  const authz = await requireUserAdmin();
  if ("error" in authz) return { ok: false, error: authz.error };
  const me = authz.sessionUser;

  const parsed = deleteUserSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: flatten(parsed.error) };
  }
  const { id } = parsed.data;

  const [target] = await db.select().from(users).where(eq(users.id, id));
  if (!target) return { ok: false, error: "User not found." };

  // Rule: you cannot delete yourself.
  if (target.id === Number(me.id)) {
    return { ok: false, error: "You cannot delete your own account." };
  }

  // Rule: never delete the last active admin.
  if (target.role === "admin" && target.active) {
    const remaining = await countActiveAdmins(target.id);
    if (remaining === 0) {
      return {
        ok: false,
        error: "This is the last active admin — it cannot be deleted.",
      };
    }
  }

  await db.delete(users).where(eq(users.id, id));

  revalidatePath("/dashboard/users");
  revalidatePath("/dashboard");
  return { ok: true };
}
